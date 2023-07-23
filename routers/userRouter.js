import express from 'express';'';
import * as userServices from '../services/userServices.js';

const userRouter = express.Router();

userRouter.get("/",userServices.get);
userRouter.get("/:id",userServices.find);
userRouter.post("/",userServices.create);
userRouter.put("/:id",userServices.update);
userRouter.delete("/:id",userServices.destroy);

userRouter.post("/login",userServices.login);

export default userRouter;