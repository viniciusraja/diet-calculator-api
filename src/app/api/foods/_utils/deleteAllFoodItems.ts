import prisma from "../../_config/db";

const deleteAllFoodItems = async () => {
  const deletedFoodItem = await prisma.foodItem.deleteMany({});

  return deletedFoodItem;
};

export default deleteAllFoodItems;
