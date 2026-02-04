import cors from "cors";
import express from "express";
import movieRoutes from "./routes/movies";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

const app = express();

app.use(express.json());
app.use("/api/movies", movieRoutes);
app.use("/images", express.static(path.join(__dirname, "../public")));
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors({ origin: process.env.FRONTEND_URL! }));

export default app;
