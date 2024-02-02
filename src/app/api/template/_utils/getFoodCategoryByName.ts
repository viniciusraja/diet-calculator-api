import prisma from "../../_config/db";

const getFoodCategoryByName = async (name: string) => {
  try {
    const foodCategory = await prisma.foodCategory.findFirst({
      where: {
        name,
      },
    });

    return foodCategory;
  } catch (error) {
    throw error;
  }
};

export default getFoodCategoryByName;
