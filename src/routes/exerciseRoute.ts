import {Router} from "express";
import {z} from "zod";
import { validateBody } from "../middleware/validations.ts";
import { authenticateToken } from "../middleware/authToken.ts";
import { createExercise, getUserExercises, getExerciseById, getExerciseByName, deleteExerciseById, clearExercises, updateExercise } from "../controllers/exerciseController.ts";

const router = Router();

//authenticate token before accessing any exercise routes
router.use(authenticateToken);

const exerciseSchema = z.object({
    exerciseName: z.string().min(1, "Exercise name is required"),
    repetitions: z.number().positive("Repetitions must be a positive integer"),
    sets: z.number().positive("Sets must be a positive integer"),
    weight: z.number().positive("Weight must be a positive number"),
    exerciseDate: z.coerce.date("Invalid exercise date").refine((date) => date <= new Date(), "Exercise date cannot be in the future"),
    description: z.string().optional()
})

const updateSchema = z.object({
    exerciseName: z.string().min(1, "Exercise name is required").optional(),
    repetitions: z.number().positive("Repetitions must be a positive integer").optional(),
    sets: z.number().positive("Sets must be a positive integer").optional(),
    weight: z.number().positive("Weight must be a positive number").optional(),
    exerciseDate: z.coerce.date("Invalid exercise date").refine((date) => date <= new Date(), "Exercise date cannot be in the future").optional(),
    description: z.string().optional()
})

router.post("/create", validateBody(exerciseSchema), createExercise);
router.get("/", getUserExercises);
router.get("/id/:id", getExerciseById);
router.get("/name/:name", getExerciseByName);
router.put("/update/:id", validateBody(updateSchema), updateExercise);
router.delete("/delete/:id", deleteExerciseById);
router.delete("/clear", clearExercises);

export default router;

