import mongoose from "mongoose";
import { seedMovies } from "../src/seed/movies";

beforeAll(async () => {
    mongoose.connect(process.env.MONGO_URI!);
    await seedMovies();
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});
