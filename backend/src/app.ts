import cors from "cors";
import express from "express";
import movieRoutes from "./routes/movies";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";
import helmet from "helmet";
import compression from "compression";
import { errorHandler } from "./middleware/error-handler";

const app = express();

// CORS at the top
app.use(
    cors({
        origin: process.env.FRONTEND_URL!,
        credentials: true,
    }),
);

// Configure Helmet to allow Cross-Origin images
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
        contentSecurityPolicy: {
            directives: {
                "default-src": ["'self'"],
                "img-src": [
                    "'self'",
                    "data:",
                    "http://localhost:5000",
                    "http://localhost:3000",
                ],
            },
        },
    }),
);

app.use(compression());
app.use(express.json());

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Static Files
app.use(
    "/images",
    express.static(path.join(process.cwd(), "public", "images")),
);

// Error handler should always be last
app.use(errorHandler);

export default app;
