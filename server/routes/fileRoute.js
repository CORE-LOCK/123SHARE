import { Router } from "express";
import fileController from "../controllers/FileController.js";
import upload from "../middlewares/multerMiddleware.js";
import getFIles from "../controllers/GetFiles.js"
import deleteFIles from "../controllers/DeleteFiles.js"

const router = Router();

router.post("/upload", upload.single("file"), fileController);
router.get("/upload", getFIles);
router.delete("/File/:id", deleteFIles)

export default router;
