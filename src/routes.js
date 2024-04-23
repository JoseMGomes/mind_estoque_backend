import express, { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";


const routes = new Router();


routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);


export default routes;
