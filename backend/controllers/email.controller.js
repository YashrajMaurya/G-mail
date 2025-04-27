import { Email } from "../models/email.model.js";

export const createEmail = async (req, res) => {
    try {
        const userId = req.id;
        const { from, to, subject, message } = req.body;
        if (!from || !to || !subject || !message) return res.status(400).json({ error: "Please fill all fields" });
        const email = await Email.create({ from, to, subject, message, userId });
        return res.status(201).json({ message: "Email sent successfully", email });
    } catch (e) {
        console.error(e);
    }
}

export const deleteEmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        if (!emailId) return res.status(400).json({ msg: "Email Id is Req" })

        const email = await Email.findByIdAndDelete(emailId)

        if (!email) return res.status(404).json({ msg: "Email not found" })

        return res.status(200).json({ msg: "Email Deleted Successfully" })
    } catch (e) {
        console.error(e);
    }
}

export const getAllEmailById = async (req, res) => {
    try {
        const userId = req.params.emailId;

        const emails = await Email.find({ "to":userId })
        return res.status(200).json({ emails })
    } catch (e) {
        console.error(e);
    }
}