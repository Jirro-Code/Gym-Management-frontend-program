import express from "express";
import path from "node:path";
import authRoutes from "./routes/authRoutes.ts";

const app = express();

//app.use(express.static(path.join(process.cwd(), "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "login.html"));
});

app.use("/api/auth", authRoutes);
export { app };
export default app;