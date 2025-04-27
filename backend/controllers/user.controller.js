import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
    try{
        const {fullname, email, password} = req.body;
        if(!fullname || !email || !password) return res.status(400).json({message:"All Fields are Required"});

        const user = await User.findOne({email})

        if(user) return res.status(401).json({message:"User Already Exist"})
        
        const hashedPassword = await bcrypt.hash(password,10)

        const profilePhoto = `https://avatar.iran.liara.run/public/boy`

        await User.create({fullname,email,password:hashedPassword,profilePhoto})

        return res.status(201).json({message:"Account Created Successfully", success: true})
    }catch(e){
        res.status(400).json({message:e})
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password) return res.status(400).json({message:"All Fields are Required"});

        const user = await User.findOne({email})

        if(!user) return res.status(401).json({mess:"Incorreect Creedntials"})
        
        const isPasswordMatch = await bcrypt.compare(password,user.password)

        if(!isPasswordMatch) return res.status(401).json({mess:"Incorreect Password"})

        const tokenData = {
            userId:user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:'1d'})
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000, httpOnly:true, sameSite:'strict'}).json({
            mess:`${user.fullname} Login Success`,
            success: true,
            user
        })
    }catch(e){
        res.status(400).json({message: e})
    }
}

export const logout = async (req,res) => {
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({msg:"LogOut Sucess"})
    }catch(e){
        console.error(e);
        
    }
}