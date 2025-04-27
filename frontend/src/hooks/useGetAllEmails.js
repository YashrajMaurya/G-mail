import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setEmails } from "../redux/appSlice";
import { useEffect } from "react";

const useGetAllEmails = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.app);

    const fetchEmails = async () => {
        if (!user || !user.email) return console.error("User not found!");

        try {
            const res = await axios.get(`https://g-mail-backend.onrender.com/api/v1/email/getallemails/${user.email}`, {
                withCredentials: true
            });
            dispatch(setEmails(res.data.emails));
        } catch (error) {
            console.error("Error fetching emails:", error);
        }
    };

    // ✅ Ensure useEffect does NOT return a function when calling fetchEmails
    useEffect(() => {
        fetchEmails(); 
        return undefined; // ✅ Fix: Prevents "destroy is not a function" error
    }, []);

    return fetchEmails; // ✅ Allows manual refresh via button
};

export default useGetAllEmails;
