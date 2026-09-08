import type { Request, Response, NextFunction } from "express";

const MAINTENANCE_MODE = false;

export const checkMaintenance = (req: Request, res: Response, next: NextFunction) => {
    if (MAINTENANCE_MODE) {
        res.status(503).send("Server is under maintenance. Please try again later.");
        return;
    }
    next();
};