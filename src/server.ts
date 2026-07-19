import express from "express";
import path from "node:path";
import authRoutes from "./routes/authRoutes.ts";
import exerciseRoutes from "./routes/exerciseRoute.ts";
import { isTest } from "../env.ts";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(morgan(`dev`, {
    skip: () => isTest(),
}));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/exercise", exerciseRoutes);

//app.use(express.static(path.join(process.cwd(), "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "login.html"));
});


export { app };
export default app;