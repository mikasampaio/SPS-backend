import "dotenv/config";
import express from "express";
import cors from "cors";
import { routes } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(process.env.PORT || 3000, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
