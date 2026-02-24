import mongoose, { Schema } from "mongoose";
import { Genre, GENRES } from "./genre";

interface IMovie {
    key: string;
    name: string;
    description: string;
    genres: Genre[];
    rate: number;
    length: number;
    year: number;
    img: string;
    trailerId?: string;
}

const MovieSchema = new Schema<IMovie>({
    key: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    genres: {
        type: [String],
        enum: GENRES,
        required: true,
    },
    rate: { type: Number, required: true, min: 0, max: 10 },
    length: { type: Number, required: true, min: 0 },
    year: { type: Number, required: true },
    img: { type: String, required: true },
    trailerId: { type: String, required: false }
});

// INDEXES (allows for much faster searching)
MovieSchema.index({ genres: 1, name: 1 });

export default mongoose.model("Movie", MovieSchema);
