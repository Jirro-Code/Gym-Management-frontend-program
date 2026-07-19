import type { Response } from 'express';
import type { AuthenticatedRequest } from '../middleware/authToken.ts';
import { db } from "../db/connections.ts";
import { exercises } from "../db/schema.ts";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

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

