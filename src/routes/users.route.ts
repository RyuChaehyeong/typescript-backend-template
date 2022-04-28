import { Router } from "express";
import passport from "passport";
import UsersController from "../controllers/users.controller";
import { isAuthenticated } from "../passport/authenticate";

const router: Router = Router();
const userController = new UsersController();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', passport.authenticate('jwt',{session: false}), userController.deleteUser);

export default router;
