import { Router } from "express";
import * as movieController from "../controllers/movie-controller";

const router = Router();

router.get("/", movieController.getMovies);
router.get("/:key", movieController.getMovieByKey);

export default router;
