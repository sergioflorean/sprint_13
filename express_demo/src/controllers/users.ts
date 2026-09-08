import fs from "node:fs/promises";
import path from "node:path";
import type { RequestHandler } from "express";

const usersPath = path.join(import.meta.dirname, "../../data/users.json");


const getUsers: RequestHandler = async (req, res) => {
    const data = await fs.readFile(usersPath, "utf-8");
    res.json(JSON.parse(data));
};

const getUserById: RequestHandler = (req, res) => {
    const userId = req.params.userId;
    res.status(200).send(`id del usuario ${userId} request received`);
};

const createUser: RequestHandler = (req, res) => {
    console.log("Solicitud POST /users recibida");
    res.status(201).send("POST /users request received");
};

const getpostByUser: RequestHandler = (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    res.status(200).send(`id del usuario ${userId}, id del post ${postId} request received`);
};

export { getUsers, getUserById, createUser, getpostByUser };