import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validate = (schema: AnyZodObject)=> (req:Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query,
            headers: req.headers
        })
        next();
    } catch (error) {
        const zoderror = error as ZodError;
        res.json({
            message: zoderror.errors[0].message
        });
    }
};

export default validate;