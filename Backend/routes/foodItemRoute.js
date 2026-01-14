import express from "express"
import {createFoodItem , getAllFoodItems} from "../controllers/foodItemController.js"
import {upload} from "../middleware/multerUpload.js"


const router = express.Router()

router.post("/create", upload.single("image"), createFoodItem);
router.get("/food-items" , getAllFoodItems)

export default router