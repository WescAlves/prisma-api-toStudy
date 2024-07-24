import { Router } from "express";
import userController from "../controlers/userController";
import checkExistsUserAccount from "../middleware/middleware";


const userRouter = Router();
userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.post('/', userController.addUser);
userRouter.delete('/:id', userController.deleteUser);



export default userRouter;