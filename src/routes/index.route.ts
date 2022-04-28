import { Router } from "express";
import IndexController from "../controllers/index.controller";

const router: Router = Router();
const indexController = new IndexController();

router.get('/', indexController.index);

export default router;
