import { Router } from "express";
import {
    AddSubCategoryController,
    deleteSubCategoryController,
    getSubCategoryController,
    updateSubCategoryController,
} from "../controllers/subCategory.controller.js";
import auth from "../middleware/auth.js";

const subCategory = Router();

subCategory.post("/create", auth, AddSubCategoryController);
subCategory.get("/get", getSubCategoryController);
subCategory.put("/update", auth, updateSubCategoryController);
subCategory.delete("/delete", auth, deleteSubCategoryController);

export default subCategory;
