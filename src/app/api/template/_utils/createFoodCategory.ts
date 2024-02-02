import prisma from "@/app/api/_config/db";
import { FoodCategory } from "@/app/api/_utils/types";

const createFoodCategory = async ({ name }: FoodCategory) => {
  try {
    const createdFoodCategory = await prisma.foodCategory.create({
      data: {
        name,
      },
    });

    return createdFoodCategory;
  } catch (err) {
    throw err;
  }
};

export default createFoodCategory;
