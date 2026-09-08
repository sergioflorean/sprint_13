import type { RequestHandler } from "express";

const getPosts: RequestHandler = (req, res) => {
    const tag = req.query.tag;

    res.status(200).send(`Posts with tag ${tag} request received`);
};

const createPost: RequestHandler = (req, res) => {

    console.log("Solicitud POST /posts recibida");

    const content = req.body.content;

    res.status(201).json({
        "message": "Publicación recibida",
        "content": content
    });
};

export { getPosts, createPost };