import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";
import sendEmail from "../configs/nodemailer.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "profile-marketplace" });

// 1. Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    { 
        id: 'sync-user-from-clerk',
        name: 'Sync User Creation',
        triggers: [{ event: 'clerk/user.created' }] // Corrected trigger syntax
    },
    async ({ event, step }) => {
        const { data } = event;

        // Check if user already exists in the database
        const user = await step.run("check-existing-user", async () => {
            return await prisma.user.findFirst({
                where: { id: data.id }
            });
        });

        if (user) {
            // Update user data if it exists
            await step.run("update-existing-user", async () => {
                return await prisma.user.update({
                    where: { id: data.id },
                    data: {
                        email: data?.email_addresses[0]?.email_address,
                        name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
                        image: data?.image_url,
                    }
                });
            });
            return;
        }

        await step.run("create-new-user", async () => {
            return await prisma.user.create({
                data: {
                    id: data.id,
                    email: data?.email_addresses[0]?.email_address,
                    name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
                    image: data?.image_url,
                }
            });
        });
    }
);

// 2. Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
    { 
        id: 'delete-user-with-clerk',
        name: 'Sync User Deletion',
        triggers: [{ event: 'clerk/user.deleted' }] // Corrected trigger syntax
    },
    async ({ event, step }) => {
        const { data } = event;

        // Gather related records using step.run
        const counts = await step.run("check-user-relations", async () => {
            const listingsCount = await prisma.listing.count({ where: { ownerId: data.id } });
            const chatsCount = await prisma.chat.count({
                where: { OR: [{ ownerUserId: data.id }, { chatUserId: data.id }] }
            });
            const transactionsCount = await prisma.transaction.count({ where: { userId: data.id } });
            
            return { listingsCount, chatsCount, transactionsCount };
        });

        if (counts.listingsCount === 0 && counts.chatsCount === 0 && counts.transactionsCount === 0) {
            await step.run("delete-user", async () => {
                return await prisma.user.delete({ where: { id: data.id } });
            });
        } else {
            await step.run("deactivate-listings", async () => {
                return await prisma.listing.updateMany({
                    where: { ownerId: data.id },
                    data: { status: "inactive" }
                });
            });
        }
    }
);

// 3. Inngest Function to update user data in database 
const syncUserUpdation = inngest.createFunction(
    { 
        id: 'update-user-from-clerk',
        name: 'Sync User Update',
        triggers: [{ event: 'clerk/user.updated' }] // Corrected trigger syntax
    },
    async ({ event, step }) => {
        const { data } = event;
        
        await step.run("update-user-data", async () => {
            return await prisma.user.update({
                where: { id: data.id },
                data: {
                    email: data?.email_addresses[0]?.email_address,
                    name: `${data?.first_name || ""} ${data?.last_name || ""}`.trim(),
                    image: data?.image_url,
                }
            });
        });
    }
);

// 4. Inngest Function to send purchase email to the customer
const sendPurchaseEmail = inngest.createFunction(
    { 
        id: 'send-purchase-email',
        name: 'Send Purchase Email',
        triggers: [{ event: "app/purchase" }] // Corrected trigger syntax
    },
    async ({ event, step }) => {
        const { transaction } = event.data;

        const customer = await step.run("fetch-customer", async () => {
            return await prisma.user.findFirst({ where: { id: transaction.userId } });
        });

        const listing = await step.run("fetch-listing", async () => {
            return await prisma.listing.findFirst({ where: { id: transaction.listingId } });
        });

        const credential = await step.run("fetch-credential", async () => {
            return await prisma.credential.findFirst({ where: { listingId: transaction.listingId } });
        });

        await step.run("send-email", async () => {
            await sendEmail({
                to: customer.email,
                subject: "Your Credentials for the account you purchased",
                html: `
                    <h2>Thank you for purchasing account @${listing.username} of ${listing.platform} platform</h2>
                    <p>Here are your credentials for the listing you purchased.</p>
                    
                    <h3>New Credentials</h3>
                    <div>
                        ${credential.updatedCredential.map((cred) => `<p>\({cred.name} :\){cred.value}</p>`).join("")}
                    </div>
                    <p>If you have any questions, please contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                `,
            });
        });
    }
);

// 5. Inngest Function to send new credentials for deleted listings
const sendNewCredentials = inngest.createFunction(
    { 
        id: 'send-new-credentials',
        name: 'Send New Credentials',
        triggers: [{ event: "app/listing-deleted" }] // Corrected trigger syntax
    },
    async ({ event, step }) => {
        const { listing, listingId } = event.data;

        const newCredential = await step.run("fetch-new-credential", async () => {
            return await prisma.credential.findFirst({ where: { listingId } });
        });

        if (newCredential) {
            await step.run("send-deleted-listing-email", async () => {
                await sendEmail({
                    to: listing.owner.email,
                    subject: "New Credentials for your deleted listing",
                    html: `
                        <h2>Your new credentials for your deleted listing :</h2>
                        title : ${listing.title} 
                        <br/>
                        username : ${listing.username}
                        <br/>
                        platform : ${listing.platform}
                        <br/>
                        <h3>New Credentials</h3>
                        <div>
                            ${newCredential.updatedCredential.map((cred) => `<p>\({cred.name} :\){cred.value}</p>`).join("")}
                        </div>
                        <h3>Old Credentials</h3>
                        <div>
                            ${newCredential.originalCredential.map((cred) => `<p>\({cred.name} :\){cred.value}</p>`).join("")}
                        </div>

                        <p>If you have any questions, please contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                    `,
                });
            });
        }
    }
);

// Inngest functions array configuration export
export const functions = [
    syncUserCreation,
    syncUserDeletion,
    syncUserUpdation,
    sendPurchaseEmail,
    sendNewCredentials
];
