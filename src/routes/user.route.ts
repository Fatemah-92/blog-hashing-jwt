
import {findAllUsers, createUser, findUser, deleteUser} from "../controller/user.controller"

import { Router } from "express";
const route = Router()

import validate from "../middleware/validate";
import { UserType } from "../schema.zod/user.zod";

//create
route.post('/', validate(UserType), createUser)

//find users
route.get('/', findAllUsers);

//find user
route.get('/:id', findUser); 

//delete user
route.delete('/:id', deleteUser)

export default route;