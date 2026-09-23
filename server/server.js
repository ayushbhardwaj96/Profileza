import "dotenv/config";
import express from "express";
import cors from "cors";
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from "./inngest/index.js";
import { serve } from "inngest/express";

const app = express();


app.use(express.json())
app.use(cors());
app.use(clerkMiddleware())


app.get("/", (req, res) => res.send("Server is live!"));

// Webhooks
app.use("/api/inngest", serve({ client: inngest, functions }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Set up this Neon project in the current working directory.

// 1. `npm i -g neon@latest && neon login`
// 2. `neon skills -y`
// 3. `neon mcp -y`
// 4. `neon link --project-id damp-scene-38681715 --branch production -y`
// 5. `neon config init`
// 6. Update `neon.ts`:

// ```ts
// import { defineConfig } from "@neon/config/v1";

// export default defineConfig({});
// ```

// 7. `neon deploy`