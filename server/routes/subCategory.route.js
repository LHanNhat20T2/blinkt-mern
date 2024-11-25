import { Router } from "express";
import { AddSubCategoryController } from "../controllers/subCategory.controller.js";
import auth from "../middleware/auth.js";

const subCategory = Router();

subCategory.post("/create", auth, AddSubCategoryController);

export default subCategory;
