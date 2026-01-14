import { FoodItem } from "../models/foodItemModel.js"
import cloudinary from "../cloudinaryConfig/cloudinary.js"

export const createFoodItem = async (req, res) => {
    try {
        const { name, price, category, subCategory, description } = req.body
        const file = req.file;
        if (!name || !price || !category || !subCategory || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const imageUrl = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "foodItems" },
                (error, result) => {
                    if (result) resolve(result.secure_url);
                    else reject(error);
                }
            );
            stream.end(file.buffer);
        });

        const foodItem = await FoodItem.create({
            name,
            price,
            description,
            category,
            subCategory,
            image: imageUrl
        })

        res.status(200).json({
            success: true,
            responseData: foodItem
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add food item!",
        });
    }
}

export const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find()

        if (foodItems.length === 0) {
            return res.status(401).json({
                message: "No food-items found"
            })
        }

        return res.status(200).json({
            success: true,
            responseData: foodItems
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch food-items",
        });
    }
}