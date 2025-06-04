import { Router } from "express"; 
import { signUp, signIn, signOut } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);

export default authRouter;
// This module defines routes for user authentication, including sign-up, sign-in, and sign-out.