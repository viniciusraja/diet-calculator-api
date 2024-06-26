import { FoodItem } from "@prisma/client";
import prismaPaginatedQuery from "../../_utils/prismaPaginatedQuery";

type DescendingFoodItemType = keyof FoodItem extends `-${infer T}`
  ? T
  : `-${keyof FoodItem}`;

type GetFoodItemByNameProps = {
  pageNumber?: number;
  foodItemName?: string;
  orderBy?: keyof FoodItem | DescendingFoodItemType;
};

const getFoodItemByName = async ({
  foodItemName,
  pageNumber = 1,
  orderBy = "name",
}: GetFoodItemByNameProps) => {
  const orderByKeyWithoutOrder = orderBy?.replace("-", "") || "name";
  const isDes = orderBy?.includes("-");

  const foodItem = await prismaPaginatedQuery({ pageNumber })({
    model: "foodItem",
    queryOptions: {
      where: {
        name: {
          contains: foodItemName || "",
          mode: "insensitive",
        },
      },
      orderBy: [
        {
          [orderByKeyWithoutOrder]: isDes ? "dec" : "asc",
        },
        {
          id: "desc",
        },
      ],
    },
  });

  return foodItem;
};

export default getFoodItemByName;
