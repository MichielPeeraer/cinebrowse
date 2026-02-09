import { Request, Response, NextFunction } from "express";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    console.error(`[Error]: ${err.message}`);

    const statusCode = err.name === "ValidationError" ? 400 : 500;

    res.status(statusCode).json({
        message: err.message || "An unexpected error occurred",
        stack: process.env.NODE_ENV === "production" ? null : err.stack,
    });
};
