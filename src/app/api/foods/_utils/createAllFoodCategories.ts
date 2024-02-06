import prisma from "@/app/api/_config/db";
import { FoodCategory } from "@prisma/client";
import getFoodCategoryByName from "./getFoodCategoryByName";

const createAllFoodCategories = async (
  foodCategoryNames: Pick<FoodCategory, "name">[]
) => {
  try {
    // const foodCategory = await getFoodCategoryByName(name);

    // if (!!foodCategory) return;

    const createdFoodCategory = await prisma.foodCategory.createMany({
      data: foodCategoryNames,
    });

    return createdFoodCategory;
  } catch (err) {
    throw err;
  }
};

export default createAllFoodCategories;
