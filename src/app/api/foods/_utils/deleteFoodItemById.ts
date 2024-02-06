import prisma from "../../_config/db";

const deleteFoodItemById = async (foodItemId: string) => {
  const deletedFoodItem = await prisma.foodItem.delete({
    where: {
      id: foodItemId,
    },
  });

  return deletedFoodItem;
};

export default deleteFoodItemById;
