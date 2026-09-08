import { Router } from "express";
import { getUsers, getUserById, createUser, getpostByUser } from "../controllers/users.js";
import { logRequest } from "../middleware/logger.js";

// app.use(logRequest);
const router = Router();

router.get("/", logRequest, getUsers);
router.get("/:userId", logRequest, getUserById);
router.post("/", logRequest, createUser);
router.get("/:userId/posts/:postId", logRequest, getpostByUser);

export default router;