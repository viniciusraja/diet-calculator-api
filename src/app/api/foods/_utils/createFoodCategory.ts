import prisma from "@/app/api/_config/db";
import { FoodCategory } from "@prisma/client";
import getFoodCategoryByName from "./getFoodCategoryByName";

const createFoodCategory = async ({ name }: Pick<FoodCategory, "name">) => {
  try {
    // const foodCategory = await getFoodCategoryByName(name);

    // if (!!foodCategory) return;

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
