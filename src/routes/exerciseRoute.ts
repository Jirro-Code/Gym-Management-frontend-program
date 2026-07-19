import {Router} from "express";
import {z} from "zod";
import { validateBody } from "../middleware/validations.ts";
import { authenticateToken } from "../middleware/authToken.ts";
import { createExercise, getAllExercises } from "../controllers/exerciseController.ts";

const router = Router();

//authenticate token before accessing any exercise routes
router.use(authenticateToken);

const exerciseSchema = z.object({
    exerciseName: z.string().min(1, "Exercise name is required"),
    repetitions: z.number().positive("Repetitions must be a positive integer"),
    sets: z.number().positive("Sets must be a positive integer"),
    exerciseDate: z.date("Invalid exercise date")
})

router.post("/create", validateBody(exerciseSchema), createExercise);
router.get("/all", getAllExercises);
export default router;

