import prisma from "@/app/api/_config/db";
import { FoodItem } from "@prisma/client";

const createFoodItem = async ({
  calories,
  carbs,
  categoryId,
  cookingMethod,
  cookingMethodCode,
  foodCode,
  lipids,
  fibers,
  protein,
  name,
}: Omit<FoodItem, "id">) => {
  try {
    const createdFoodItem = await prisma.foodItem.create({
      data: {
        calories,
        carbs,
        cookingMethod,
        cookingMethodCode,
        foodCode,
        lipids,
        fibers,
        protein,
        categoryId,
        name,
      },
    });

    return createdFoodItem;
  } catch (err) {
    throw err;
  }
};

export default createFoodItem;
