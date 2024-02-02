import prisma from "@/app/api/_config/db";
import { FoodItem } from "@/app/api/_utils/types";

const createFoodItem = async ({
  calories,
  carbs,
  categoryId,
  cooking_method,
  fibers,
  protein,
}: FoodItem) => {
  try {
    const createdFoodItem = await prisma.foodItem.create({
      data: {
        calories,
        carbs,
        cooking_method,
        fibers,
        protein,
        categoryId,
      },
    });

    return createdFoodItem;
  } catch (err) {
    throw err;
  }
};

export default createFoodItem;
