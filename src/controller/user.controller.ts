import {prisma} from "../config/db";
import {Request, Response } from "express";

import * as argon2 from "argon2";
import * as jwt from 'jsonwebtoken';

//create
export const createUser = async (req: Request, res: Response)=> {
    const {username, password, email, role} = req.body;
    // HASHING PASSWORD 
    const hashedPassword = await argon2.hash(password);
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                role,
                password: hashedPassword
            }
        });
        if(user)
        res.status(200).json({"message":"User Created!", "user": user})
    } catch (error) {
        res.status(500).json(error)
    }
}

//find all users
export const findAllUsers = async (req: Request, res: Response)=> {
    let users = await prisma.user.findMany();
    console.log(users);
    res.json(users);
}

//find one user (login)
export const findUser = async (req: Request, res: Response)=> {
    const {email, password} = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    try {
        if(user) {
            // VERIFY PASSWORD
            let isValidPassword = await argon2.verify(user.password, password);
            if(isValidPassword) {
                let token = jwt.sign({
                    id: user.id,
                    name: user.id,
                }, process.env.KEY_SECRET as string, {expiresIn: '2h'})
                return res.status(200).json({"message": `Welcome ${user.username}!`, "token": token})
            }
            else return res.status(400).json({"message": "Wrong password !"})
        }
        else return res.status(400).json({"message": "Wrong email | password !"})
    } catch (error) {
        res.json(error)
    }
    
}

//delete
export const deleteUser = async (req: Request, res: Response)=> {
    try {
        let deletedUser = await prisma.user.delete({
            where: {
                id: req.params.id
            }
        })
        res.json({"message": "user deleted", "deletedUser": deletedUser});
    }catch(error){
        res.json({"message": error})
    }     
}

