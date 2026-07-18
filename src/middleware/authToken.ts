import type {Request, Response, NextFunction} from "express";
import {verifyToken, type JwtPayload} from "../utils/jwt.ts";

//extends the Request interface to include user property
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try{
        const authHeader = req.headers.authorization;
        //splits the authorization header to get the token
        const token = authHeader && authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({error: "No token provided"});
        } 

        const payload = await verifyToken(token);

        //attaches the payload to the request object for further use
        req.user = payload;
        console.log("Authenticated user:", req.user);
        next();
    }catch (e){
        return res.status(403).json({error: "Forbidden"});
    }
}