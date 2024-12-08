import express from "express";
import router from "./src/routes/router.js";
import dotenv from "dotenv";
import notFoundRoute from "./src/middleware/notFoundRoute.js";
import { validateJson } from "./src/middleware/validateJson.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(validateJson);
app.use(router);

app.use(notFoundRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
