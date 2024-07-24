import { Router } from "express";
import technologyController from "../controlers/technologyController";
import checkExistsUserAccount from "../middleware/middleware";

const technologyRouter = Router();



technologyRouter.post('/', checkExistsUserAccount ,technologyController.addTechnology);
technologyRouter.get('/', checkExistsUserAccount ,technologyController.getUserTechnologies);
technologyRouter.delete('/:id', checkExistsUserAccount ,technologyController.deleteUserTechnology);
technologyRouter.put('/:id', checkExistsUserAccount ,technologyController.updateTechnology);
technologyRouter.patch('/:id/studied', checkExistsUserAccount,technologyController.updateStudiedTechnology);
export default technologyRouter ;