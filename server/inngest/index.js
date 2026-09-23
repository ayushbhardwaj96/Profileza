import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "Profileza" });

// Inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk", triggers: [{ event: "clerk/user.created" }] },
  async ({ event }) => {
      const {data} = event 

    //   check if user already exists in the database
    const user = await prisma.user.findFirst({
            where: { id: data.id }
        });

        if (user) {
            // Update user data if it exists
            await prisma.user.update({
                where: { id: data.id },
                data: {
                    email: data?.email_addresses[0]?.email_address,
                    name: data?.first_name + " " + data?.last_name,
                    image: data?.image_url,
                }
            });
            return;
        }

          await prisma.user.create({
            data: {
                id: data.id,
                email: data?.email_addresses[0]?.email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
            }
        });

  },
);

// Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async ({ event }) => {

        const { data } = event;

        const listings = await prisma.listing.findMany({
            where: { ownerId: data.id }
        })

        const chats = await prisma.chat.findMany({
            where: { OR: [{ ownerUserId: data.id }, { chatUserId: data.id }] }
        })

        const transactions = await prisma.transaction.findMany({
            where: { userId: data.id }
        })

        if (listings.length === 0 && chats.length === 0 && transactions.length === 0) {
            await prisma.user.delete({ where: { id: data.id } });
        } else {
            await prisma.listing.updateMany({
                where: { ownerId: data.id },
                data: { status: "inactive" }
            })
        }
    }
)

// Inngest Function to update user data in database 
const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async ({ event }) => {
        const { data } = event;
        await prisma.user.update({
            where: {
                id: data.id,
            },
            data: {
                email: data?.email_addresses[0]?.email_address,
                name: data?.first_name + " " + data?.last_name,
                image: data?.image_url,
            }
        });
    }
)

// Inngest Function to send purchase email to the customer
const sendPurchaseEmail = inngest.createFunction(
    { id: 'send-purchase-email' },
    { event: "app/purchase" },
    async ({ event }) => {

        const { transaction } = event.data;

        const customer = await prisma.user.findFirst({
            where: { id: transaction.userId },
        });

        const listing = await prisma.listing.findFirst({
            where: { id: transaction.listingId },
        });

        const credential = await prisma.credential.findFirst({
            where: { listingId: transaction.listingId },
        });

        await sendEmail({
            to: customer.email,
            subject: "Your Credentials for the account you purchased",
            html: `
                        <h2>Thank you for purchasing account @${listing.username} of ${listing.platform} platform</h2>
                        <p>Here are your credentials for the listing you purchased.</p>
                        
                        <h3>New Credentials</h3>
                        <div>
                            ${credential.updatedCredential.map((cred) => `<p>${cred.name} : ${cred.value}</p>`).join("")}
                        </div>
                        <p>If you have any questions, please contact us at <a href="mailto:support@example.com">support@example.com</a></p>
                    `,
        });

    }
)

 

// Create an empty array where we'll export future Inngest functions
export const functions = [
    syncUserCreation,
     syncUserDeletion,
    syncUserUpdation,
    sendPurchaseEmail,
    

];