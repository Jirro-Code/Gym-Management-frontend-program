import {Router} from "express";

const router = Router();

router.post("/login", async (req, res) => {
  // Handle login logic here
  res.send("Login route");
});

export { router };
export default router;