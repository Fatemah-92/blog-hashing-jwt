import { Request, Response, NextFunction } from "express";

import * as jwt from 'jsonwebtoken';

interface User {
    id: string,
    name: string
    role: string
}

const auth = (req: Request, res: Response, next: NextFunction)=> {
    try {
        let token = req.headers.authorization;
        if(! token) {
            return res.status(403).json({"message": "u r not authorized"})
        } else {
            const user = jwt.verify(token, process.env.KEY_SECRET as string) as User
            if(user.role === "User") {
                res.locals.user = user;
                next()
            } else {
                return res.status(403).json({"message": "u r not authorized"})
            }
        }  
    } catch (error) {
        res.status(403).json({"error": error})
    } 
}

export default auth;