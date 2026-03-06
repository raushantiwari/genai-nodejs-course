import cors from "cors";
import express from "express";
import { askStructured } from "./ask-core";
import { loadEnv } from "./env";

loadEnv();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:8082", "http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);
app.use(express.json());

app.post("/ask", async (req, res) => {
  try {
    const { query, provider, modelsName } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Invalid query parameter." });
    }
    const out = await askStructured(query, provider, modelsName);
    return res.status(200).json({ result: out });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || "Failed to answer." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
