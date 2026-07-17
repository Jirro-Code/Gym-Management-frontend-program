import express from "express";
import path from "node:path";

const app = express();

//app.use(express.static(path.join(process.cwd(), "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public", "login.html"));
});

export { app };
export default app;