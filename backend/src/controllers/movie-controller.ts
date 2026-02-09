import { Request, Response, NextFunction } from "express";
import Movie from "../models/movie";
import { GENRES } from "../models/genre";

const getImageUrl = (img: string) => `/images/${img}`;

export const getMovies = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { g, q } = req.query;
        const filter: any = {};

        if (g) {
            const genreList = Array.isArray(g)
                ? (g as string[])
                : [g as string];

            const isValid = genreList.every((val) =>
                (GENRES as readonly string[]).includes(val),
            );

            if (!isValid) {
                return res
                    .status(400)
                    .json({ message: "Invalid genre provided" });
            }

            filter.genres = { $all: genreList };
        }

        if (q && typeof q === "string") {
            filter.name = { $regex: q, $options: "i" };
        }

        const movies = await Movie.find(filter);
        const moviesWithUrls = movies.map((m) => {
            const movieObj = m.toObject();
            movieObj.img = getImageUrl(movieObj.img);
            return movieObj;
        });

        res.json(moviesWithUrls);
    } catch (error) {
        next(error); // Forward to the error middleware
    }
};

export const getMovieByKey = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const movie = await Movie.findOne({ key: req.params.key });
        if (!movie) return res.status(404).json({ message: "Movie not found" });

        const movieObj = movie.toObject();
        movieObj.img = getImageUrl(movieObj.img);
        res.json(movieObj);
    } catch (error) {
        next(error);
    }
};
