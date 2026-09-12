import "dotenv/config";
import express from "express";
import cors from "cors";

const app = express();


app.use(express.json())
app.use(cors());

app.get("/", (req, res) => res.send("Server is live!"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
