import { Router } from "express";
import { getUsers, getUserById, createUser, getpostByUser } from "../controllers/users.js";

const router = Router();

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.get("/:userId/posts/:postId", getpostByUser);

export default router;