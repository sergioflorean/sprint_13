import type { RequestHandler } from "express";


const getUsers: RequestHandler = (req, res) => {
    console.log("Solicitud GET /users recibida");
    res.status(200).send("GET /users request received");
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