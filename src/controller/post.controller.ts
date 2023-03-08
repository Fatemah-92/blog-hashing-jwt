import {prisma} from "../config/db";
import {Request, Response } from "express";

//create post
export const createPost = async (req: Request, res: Response)=> {
    const {title, idUser} = req.body;
    let post = await prisma.post.create({
        data: {
            title,
            idUser     
        }
    })
    res.json({"message": "post created", "user": post});
}

//find all posts
export const findAllPosts = async (req: Request, res: Response)=> {
    let posts = await prisma.post.findMany();
    res.json(posts);
}

//find user's post
export const findOneUserPost = async (req: Request, res: Response)=> {  
    try {
            let post = await prisma.post.findFirst({
            where: {
                idUser: req.params.id
            },
            select: {
                title: true,
                createData: true,
                user: {
                    select: {
                        username: true,
                        email: true,
                        role: true
                    }
                }
            }
        })
        if(! post) {
            res.json({"message": "No posts yet!"})
        } else {
            res.json({"user": `${post.user.username}`, "Post": `${post.title}`})
        }
    } catch (error) {
        res.json({"message": error})
    }
    
}

//update post
export const updatePost = async (req: Request, res: Response)=> {
    const {title, idUser} = req.body;
    let updatePost = await prisma.post.update({
        where: {
            id: req.params.id
        },
            data: {
                title,
                idUser
        }
    })
    res.json({"message": "post updated", "post": updatePost});
}

//delete all posts for user
export const deleteAllPost = async (req: Request, res: Response)=> {
    try {
        let deleteAllPost = await prisma.post.deleteMany({
            where: {
                idUser: req.params.id
            }
        })
        res.json({"message": "all posts deleted", "deleted post": deleteAllPost});
    }catch(e){
        res.json({"message": e})
    }     
}

//delete one post
export const deleteOnePost = async (req: Request, res: Response)=> {
    try {
        let deleteOnePost = await prisma.post.delete({
            where: {
                id: req.params.id
            }
        })
        res.json({"message": "post deleted", "deleted post": deleteOnePost});
    }catch(e){
        res.json({"message": e})
    }     
}