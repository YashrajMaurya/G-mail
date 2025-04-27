import jwt from 'jsonwebtoken'

const isAuthenticated = async (req,res,next) => {
    try{
        const token = req.cookies.token;
        // console.log(token);
        if(!token){
            return res.status(404).json({mss:'User not Authenticated'})
        }
        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if(!decode) {
            return res.status(401).json({mess:'Inavlid Token'})
        }
        req.id = decode.userId
        next()
    }catch(e){
        console.error(e);
    }
}

export default isAuthenticated;