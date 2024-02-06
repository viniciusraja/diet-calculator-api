import prisma from "@/app/api/_config/db";
import { FoodItem } from "@prisma/client";

const createAllFoodItems = async (foodItems: Omit<FoodItem, "id">[]) => {
  try {
    const createdFoodItem = await prisma.foodItem.createMany({
      data: foodItems,
    });

    return createdFoodItem;
  } catch (err) {
    throw err;
  }
};

export default createAllFoodItems;
