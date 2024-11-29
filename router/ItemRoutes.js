import { Router } from "express";
import { createItem, deleteItem, getItem, getItemID, updateItem } from "../controller/ItemController.js";
import { isAuthenticated } from "../middleware/AuthMiddleware.js";

const router = Router();

router.post("/create",isAuthenticated,createItem)

router.get("/get",isAuthenticated,getItem)

router.get("/get/:id",isAuthenticated,getItemID)

router.patch("/update/:id",isAuthenticated,updateItem)

router.delete("/delete/:id",isAuthenticated,deleteItem)

export default router