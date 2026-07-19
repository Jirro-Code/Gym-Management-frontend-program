import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/authToken.ts';
import { db } from "../db/connections.ts";
import { exercises } from "../db/schema.ts";
import { desc, eq, and} from "drizzle-orm";
import Fuse from "fuse.js"
import { v4 as uuid } from "uuid";
import  z  from "zod";


export const createExercise = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const exerciseData = {
            ...req.body,
            id: uuid(),
            userId: req.user!.id,
        }
        await db.insert(exercises).values(exerciseData);
        
        res.status(201).json({message: "Exercise created successfully", exercise: exerciseData});

    }catch(e){
        console.error("Error occurred while creating exercise:", e);
        res.status(500).json({message: "Internal server error", error: e});
    }
}


export const getUserExercises = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const userId = req.user!.id;

        const userExercises = await db.query.exercises.findMany({
            where: eq(exercises.userId, userId),
            orderBy: [desc(exercises.exerciseDate)]
        })

        res.status(200).json({message: "Exercises fetched successfully", exercises: userExercises});

    }catch(e){
        console.error("Error occurred while fetching exercises:", e);
        res.status(500).json({message: "Internal server error", error: e});
    }
}


export const getExerciseById = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const exerciseId = z.string().uuid("Invalid exercise ID").parse(req.params.id); // Validate that the exerciseId is a valid UUID
        const userId = req.user!.id;

        const userExercise = await db.query.exercises.findFirst({
            where: and(eq(exercises.id, exerciseId), eq(exercises.userId, userId))
        })

        if (!userExercise) {
            return res.status(404).json({message: "Exercise not found"});
        }

        res.status(200).json({message: "Exercise fetched successfully", exercise: userExercise});
        
    }catch(e){
        if (e instanceof z.ZodError) {
            console.error("Invalid exercise ID", e);
            return res.status(400).json({message: "Invalid exercise ID", error: e.issues});
        }
        console.error("Error occurred while fetching exercise by ID:", e);
        res.status(500).json({message: "Internal server error", error: e});
    }
}


export const getExerciseByName = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const exerciseName = z.string().min(1).parse(req.params.name); // Validate that the exerciseName is a valid string
        const userId = req.user!.id;

        const userExercises = await db.query.exercises.findMany({
            where: eq(exercises.userId, userId),
            orderBy: [desc(exercises.exerciseDate)]
        })

        // Used for fuzzy searching. threshold is used to determine how closely the search matches
        // A lower threshold means a closer match is required.
        const fuse = new Fuse(userExercises, {
            keys: ['exerciseName'],
            threshold: 0.3
        });

        const results = fuse.search(exerciseName);

        if (results.length === 0) {
            return res.status(404).json({message: "Exercise not found"});
        }

        res.status(200).json({message: "Exercise fetched successfully", exercise: results.map(result => result.item)});
        
    }catch(e){
        if (e instanceof z.ZodError) {
            console.error("Invalid exercise name", e);
            return res.status(400).json({message: "Invalid exercise name", error: e.issues});
        }
        console.error("Error occurred while fetching exercise by name:", e);
        res.status(500).json({message: "Internal server error", error: e});
    }
}

export const updateExercise = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const exerciseId = z.string().uuid("Invalid exercise ID").parse(req.params.id); // Validate that the exerciseId is a valid UUID
        const userId = req.user!.id;
        
        if(Object.keys(req.body).length === 0){
            return res.status(400).json({message: "No fields provided for update"});
        }
        
        await db.update(exercises).set(req.body).where(and(eq(exercises.id, exerciseId), eq(exercises.userId, userId)));
        
        res.status(200).json({message: "Exercise updated successfully"});
    }
    catch (e){
        if (e instanceof z.ZodError) {
            console.error("Invalid exercise ID", e);
            return res.status(400).json({message: "Invalid exercise ID", error: e.issues});
        }
        console.error("Error occurred while updating exercise:", e);
        res.status(500).json({message: "Internal server error", error: e});
    }
}

export const deleteExerciseById = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const exerciseId = z.string().uuid("Invalid exercise ID").parse(req.params.id); // Validate that the exerciseId is a valid UUID
        const userId = req.user!.id;

        const exerciseToDelete = await db.query.exercises.findFirst({
            where: and(eq(exercises.id, exerciseId), eq(exercises.userId, userId))
        });

        if (!exerciseToDelete) {
            return res.status(404).json({message: "Exercise not found"});
        }

        await db.delete(exercises).where(and(eq(exercises.id, exerciseId), eq(exercises.userId, userId)));

        const {...deletedExercise} = exerciseToDelete;

        res.status(200).json({message: "Exercise deleted successfully", exercise: deletedExercise});
        
    }catch(e){
        if (e instanceof z.ZodError) {
            console.error("Invalid exercise ID", e);
            return res.status(400).json({message: "Invalid exercise ID", error: e.issues});
        }
        console.error("Error occurred while deleting exercise by ID:", e);
        res.status(500).json({message: "Internal server error", error: e});
    }
}

export const clearExercises = async (req: AuthenticatedRequest, res: Response) => {
    try{
        const userId = req.user!.id;
        await db.delete(exercises).where(eq(exercises.userId, userId));
        res.status(200).json({message: "All exercises deleted successfully"});
    }
    catch (e) {
        console.error("Error occurred while clearing exercises:", e);
        res.status(500).json({message: "Internal server error", error: e});
    }
}