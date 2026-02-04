import dotenv from "dotenv";
import mongoose from "mongoose";
import { seedMovies } from "./movies";

dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        await seedMovies();
        console.log("Database seeded successfully");
        process.exit(0);
    } catch (err) {
        console.error("Seeding failed:", err);
        process.exit(1);
    }
})();
