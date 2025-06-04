import { Router } from "express";
import { getUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();


userRouter.get('/', getUsers);

userRouter.get('/:id', getUser);

userRouter.post('/', (req, res) => {
    res.send({title: 'CREATE a new user'})
});

userRouter.put('/', (req, res) => {
    res.send({title: 'UPDATE user details'})
});


userRouter.delete('/:id', (req, res) => {
    res.send({title: 'DELETE a user'})           
});


export default userRouter;
// This module defines routes for user management, including getting all users, getting user details, creating a new user, updating user details, and deleting a user.
