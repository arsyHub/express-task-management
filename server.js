import express from "express";
import router from "./src/routes/router.js";
import dotenv from "dotenv";
import { jsonValidation } from "./src/middleware/jsonValidation.js";
import notFoundRoute from "./src/middleware/notFoundRoute.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    allowedHeaders: ["Content-Type", "secret_key"], // Pastikan header kustom diizinkan
  })
);

app.use(express.json());
app.use(jsonValidation);
app.use(router);

app.use(notFoundRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
