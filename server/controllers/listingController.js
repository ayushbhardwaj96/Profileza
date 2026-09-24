import fs from "fs";
import imagekit from "../configs/imageKit.js";
import prisma from "../configs/prisma.js";
import Stripe from "stripe";

// Controller For Adding Listing to Database
export const addListing = async (req, res) => {
    try {
        const { userId } = await req.auth();

        if (req.plan !== "premium") {
            const listingCount = await prisma.listing.count({
                where: { ownerId: userId },
            });
            if (listingCount >= 5) {
                return res.status(400).json({ message: "you have reached the free listing limit" });
            }
        }

        const accountDetails = JSON.parse(req.body.accountDetails);

        accountDetails.followers_count = parseFloat(accountDetails.followers_count);
        accountDetails.engagement_rate = parseFloat(accountDetails.engagement_rate);
        accountDetails.monthly_views = parseFloat(accountDetails.monthly_views);
        accountDetails.price = parseFloat(accountDetails.price);
        accountDetails.platform = accountDetails.platform.toLowerCase();
        accountDetails.niche = accountDetails.niche.toLowerCase();

        accountDetails.username.startsWith("@") ? accountDetails.username = accountDetails.username.slice(1) : null;

        const uploadImages = req.files.map(async (file) => {
            const imgBuffer = fs.createReadStream(file.path);

            const response = await imagekit.files.upload({
                file: imgBuffer,
                fileName: `${Date.now()}.png`,
                folder: "Profileza",
                transformation: { pre: "w-1280,h-auto" },
            });

            return response.url;
        });

        // Wait for all uploads to complete
        const images = await Promise.all(uploadImages);

        const listing = await prisma.listing.create({
            data: {
                ownerId: userId,
                images,
                ...accountDetails,
            },
        });

        return res.status(201).json({ message: "Account Listed successfully", listing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Controller For Getting All Public Listing
export const getAllPublicListing = async (req, res) => {
    try {
        const listings = await prisma.listing.findMany({
            where: { status: "active" },
            include: { owner: true },
            orderBy: { createdAt: "desc" },
        });

        if (!listings || listings.length === 0) {
            return res.json({ listings: [] });
        }

        return res.json({ listings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Controller For Getting All User Listing
export const getAllUserListing = async (req, res) => {
    try {
        const { userId } = await req.auth();

        // get all listings except deleted
        const listings = await prisma.listing.findMany({
            where: { ownerId: userId, status: { not: "deleted" } },
            orderBy: { createdAt: "desc" },
        });

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        const balance = {
            earned: user.earned,
            withdrawn: user.withdrawn,
            available: user.earned - user.withdrawn,
        };

        if (!listings || listings.length === 0) {
            return res.json({ listings: [], balance });
        }

        return res.json({ listings, balance });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Controller For Updating Listing in Database
export const updateListing = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const accountDetails = JSON.parse(req.body.accountDetails);

        if (req.files.length + accountDetails.images.length > 5) {
            return res.status(400).json({ message: "You can only upload up to 5 images" });
        }

        accountDetails.followers_count = parseFloat(accountDetails.followers_count);
        accountDetails.engagement_rate = parseFloat(accountDetails.engagement_rate);
        accountDetails.monthly_views = parseFloat(accountDetails.monthly_views);
        accountDetails.price = parseFloat(accountDetails.price);
        accountDetails.platform = accountDetails.platform.toLowerCase();
        accountDetails.niche = accountDetails.niche.toLowerCase();

        accountDetails.username.startsWith("@") ? accountDetails.username = accountDetails.username.slice(1) : null;

        const listing = await prisma.listing.update({
            where: { id: accountDetails.id, ownerId: userId },
            data: accountDetails,
        });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.status === "sold") {
            return res.status(400).json({ message: "you can't update sold listing" });
        }

        if (req.files.length > 0) {
            const uploadImages = req.files.map(async (file) => {
                const imgBuffer = fs.createReadStream(file.path);
                const response = await imagekit.files.upload({
                    file: imgBuffer,
                    fileName: `${Date.now()}.png`,
                    folder: "social-marketplace",
                    transformation: { pre: "w-1280,h-auto" },
                });
                return response.url;
            });

            // Wait for all uploads to complete
            const images = await Promise.all(uploadImages);

            const listing = await prisma.listing.update({
                where: { id: accountDetails.id, ownerId: userId },
                data: {
                    ownerId: userId,
                    ...accountDetails,
                    images: [...accountDetails.images, ...images],
                },
            });

            return res.json({ message: "Account Updated successfully", listing });
        }

        return res.json({ message: "Account Updated successfully", listing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

export const toggleStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = await req.auth();

        const listing = await prisma.listing.findUnique({
            where: { id, ownerId: userId },
        });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.status === "active" || listing.status === "inactive") {
            await prisma.listing.update({
                where: { id, ownerId: userId },
                data: { status: listing.status === "active" ? "inactive" : "active" },
            });
        } else if (listing.status === "ban") {
            return res.status(400).json({ message: "Your listing is banned" });
        } else if (listing.status === "sold") {
            return res.status(400).json({ message: "Your listing is sold" });
        }

        return res.json({ message: "Listing status updated successfully", listing });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

// Controller For Deleting Listing
export const deleteUserListing = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { listingId } = req.params;

        const listing = await prisma.listing.findFirst({
            where: { id: listingId, ownerId: userId },
            include: { owner: true },
        });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        if (listing.status === "sold") {
            return res.status(400).json({ message: "sold listing can't be deleted" });
        }

        // If password has been changed, send the new password to the owner
        if (listing.isCredentialChanged) {
            await inngest.send({
                name: "app/listing-deleted",
                data: { listing, listingId },
            });
        }

        await prisma.listing.update({
            where: { id: listingId },
            data: { status: "deleted" },
        });

        return res.json({ message: "Listing deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

export const addCredential = async (req, res) => {
    try {
        const { userId } = await req.auth();

        const { listingId, credential } = req.body;

        if (credential.length === 0 || !listingId) {
            return res.status(400).json({ message: "Missing Feilds" });
        }

        const listing = await prisma.listing.findFirst({
            where: { id: listingId, ownerId: userId },
        });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found or you are not the owner" });
        }

        await prisma.credential.create({
            data: {
                listingId,
                originalCredential: credential,
            },
        });

        await prisma.listing.update({
            where: { id: listingId },
            data: { isCredentialSubmitted: true },
        });

        return res.json({ message: "Credential added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};


export const purchaseAccount = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { listingId } = req.params;
        const { origin } = req.headers;

        const listing = await prisma.listing.findFirst({
            where: { id: listingId, status: "active" },
        });

        if (!listing) {
            return res.status(404).json({ message: "Listing not found or not active" });
        }

        if (listing.ownerId === userId) {
            return res.status(400).json({ message: "You can't purchase your own listing" });
        }

        const transaction = await prisma.transaction.create({
            data: {
                listingId,
                ownerId: listing.ownerId,
                userId,
                amount: listing.price,
            },
        });

        // Stripe Payment Link
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `Purchasing Account @${listing.username} of ${listing.platform} platform`,
                    },
                    unit_amount: Math.floor(transaction.amount) * 100,
                },
                quantity: 1,
            },
        ];

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-orders`,
            cancel_url: `${origin}/marketplace`,
            line_items: line_items,
            mode: "payment",
            metadata: {
                transactionId: transaction.id,
                appId: "Profileza",
            },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // Expires in 30 minutes
        });

        return res.json({ paymentLink: session.url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

export const markFeatured = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = await req.auth();

        if (req.plan !== "premium") {
            return res.status(400).json({ message: "Premium plan required" });
        }

        // Unset all other featured listings
        await prisma.listing.updateMany({
            where: { ownerId: userId },
            data: { featured: false },
        });

        // Mark the listing as featured
        await prisma.listing.update({
            where: { id },
            data: { featured: true },
        });

        return res.json({ message: "Listing marked as featured" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};


export const getAllUserOrders = async (req, res) => {
    try {
        const { userId } = await req.auth();

        let orders = await prisma.transaction.findMany({
            where: { userId, isPaid: true },
            include: { listing: true },
        });

        if (!orders || orders.length === 0) {
            return res.json({ orders: [] });
        }

        // Attach the credential to each order
        const credentials = await prisma.credential.findMany({
            where: { listingId: { in: orders.map((order) => order.listingId) } },
        });

        const ordersWithCredentials = orders.map((order) => {
            const credential = credentials.find((cred) => cred.listingId === order.listingId);
            return { ...order, credential };
        });

        return res.json({ orders: ordersWithCredentials });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

export const withdrawAmount = async (req, res) => {
    try {
        const { userId } = await req.auth();
        const { amount, account } = req.body;

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        const balance = user.earned - user.withdrawn;

        if (amount > balance) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const withdrawal = await prisma.withdrawal.create({
            data: {
                userId,
                amount,
                account,
            },
        });

        await prisma.user.update({
            where: { id: userId },
            data: { withdrawn: { increment: amount } },
        });

        return res.json({ message: "Applied for withdrawal", withdrawal });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.code || error.message });
    }
};

