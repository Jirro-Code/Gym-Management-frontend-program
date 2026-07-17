import {Router} from "express";
import { register } from "../controllers/authController.ts";
import { validateBody } from "../middleware/validations.ts";
import { insertUserSchema } from "../db/schema.ts";


const router = Router();

router.post("/register", validateBody(insertUserSchema), register);

export { router };
export default router;