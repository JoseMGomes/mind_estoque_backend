import express, { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./middlewares/auth";
import StockController from "./app/controllers/StockController";
import FileController from "./app/controllers/FileController";

const path = require("path");
const routes = new Router();
const upload = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use(authMiddleware);

// rotas de estoque
routes.post("/stock",  StockController.store);
routes.get("/stock", StockController.findAll);
routes.patch("/stock/add_item/:stockId", StockController.add_item);
routes.patch("/stock/remove_item/:stockId", StockController.remove_item);

routes.put("/stock/:stockId", StockController.update);

// Gerenciamento das imagens
const imageDirectory = path.join(__dirname, "tmp/uploads");
routes.use("/images", express.static(imageDirectory));

routes.get("/image/:filename", (req, res) => {
    const filename = req.params.filename;

    const filePath = path.join(imageDirectory, filename);

    res.sendFile(filePath);
});

routes.post("/upload/:stockId", upload.single("file"), FileController.store);

export default routes;

