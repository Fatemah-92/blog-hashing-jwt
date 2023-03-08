import {createPost, deleteAllPost, deleteOnePost, findAllPosts, findOneUserPost, updatePost} from "../controller/post.controller"

import { Router } from "express";
const route = Router()

import validate from "../middleware/validate";
import { PostType } from "../schema.zod/post.zod";
import auth from "../middleware/auth";

//create
route.post('/', auth, validate(PostType),createPost);

//find all posts
route.get('/', auth, findAllPosts);

//find user post
route.get('/:id', auth, findOneUserPost);

//update post
route.put('/:id', auth, updatePost);

//delete all posts for user
route.delete('/deletePosts/:id', auth, deleteAllPost)

//delete one post
route.delete('/deletePost/:id', auth, deleteOnePost)

export default route;