import { Router } from 'express';
import {UserController} from './controller/userController';

const routes = Router();

const userController = new UserController();

routes.post('/user', userController.addUser);

export { routes };
