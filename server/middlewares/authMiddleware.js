import { clerkClient } from "@clerk/express";


export const protect = async (req, res, next) => {
    try {
        const { userId, has } = await req.auth();

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const hasPremiumPlan = await has({ plan: 'premium' });
        req.plan = hasPremiumPlan ? 'premium' : 'free';

        return next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.code || error.message });
    }
};

export const protectAdmin = async (req, res, next) => {
    try {
        // 1. Get the user ID from clerk
        const userId = typeof req.auth === 'function' ? await req.auth().userId : req.auth?.userId;
        
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: Missing authentication context" });
        }

        const user = await clerkClient.users.getUser(userId);

        // 2. Add the fallback '|| ""' so it never throws a TypeError
        const adminEmails = (process.env.ADMIN_EMAILS || "").split(",");
        
        // 3. Extract the array item's email address safely
        const userEmail = user.emailAddresses?.[0]?.emailAddress;
        const isAdmin = adminEmails.includes(userEmail);

        if (!isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Not an admin" });
        }

        return next();
    } catch (error) {
        console.log("Admin Protection Error:", error);
        res.status(401).json({ message: error.code || error.message });
    }
};
