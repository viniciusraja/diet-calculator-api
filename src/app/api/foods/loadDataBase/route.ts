import { NextResponse } from "next/server";
import limitRoute from "../../_utils/limitNumberOfRequests";
import readCSVFile from "../_utils/readCSVFile";
import getHeaders from "../../_utils/getHeaders";
import { FoodItem } from "@prisma/client";
import getFoodCategoryByName from "../_utils/getFoodCategoryByName";
import createAllFoodItems from "../_utils/createAllFoodItems";
import createAllFoodCategories from "../_utils/createAllFoodCategories";

type RawTableRow = {
  "Código do Alimento": string;
  "Nome do alimento": string;
  "": "";
  "Código e descrição da preparação": string;
  "Energia (kcal)": string;
  "Proteína\r\n (g)": string;
  "Lipídios totais\r\n (g)": string;
  "Carboi-\r\n drato\r\n (g)": string;
  "Fibra alimentar total (g)": string;
};

type FormattedRow = {} & Omit<FoodItem, "categoryId" | "id">;

const formatRowNames = (row: RawTableRow): FormattedRow => {
  return {
    foodCode: row?.["Código do Alimento"],
    name: row?.["Nome do alimento"],
    calories: parseFloat(row?.["Energia (kcal)"].replace?.(",", ".")),
    cookingMethodCode: row?.[""],
    cookingMethod: row?.["Código e descrição da preparação"],
    protein: parseFloat(row?.["Proteína\r\n (g)"].replace?.(",", ".")),
    lipids: parseFloat(row?.["Lipídios totais\r\n (g)"].replace?.(",", ".")),
    carbs: parseFloat(row?.["Carboi-\r\n drato\r\n (g)"].replace?.(",", ".")),
    fibers: parseFloat(row?.["Fibra alimentar total (g)"].replace?.(",", ".")),
  };
};

const checkRowType = (row: FormattedRow): "foodCategoryName" | "foodItem" => {
  const { calories, fibers, protein, foodCode, lipids, name } = row;

  if (!!foodCode && !lipids && !protein && !calories && !fibers && !name)
    return "foodCategoryName";

  return "foodItem";
};

const checkIfRowIsValid = (row: FormattedRow): boolean => {
  const {
    calories,
    carbs,
    cookingMethod,
    fibers,
    name,
    protein,
    cookingMethodCode,
    foodCode,
    lipids,
  } = row;

  if (
    !!calories ||
    !!carbs ||
    !!cookingMethod ||
    !!fibers ||
    !!name ||
    !!protein ||
    !!cookingMethodCode ||
    !!foodCode ||
    !!lipids
  )
    return true;

  return false;
};

export const POST = async (req: Request) =>
  limitRoute(async () => {
    //SHORT CIRCUIT LOAD DATABASE
    return;

    const table = (await readCSVFile()) as RawTableRow[];

    try {
      const formattedRowTables = table?.map(formatRowNames);

      const categories = table?.reduce(
        (
          acc: { categoryName: string; tableCategoryIndex: number }[],
          row: RawTableRow,
          index
        ) => {
          const formattedRow = formatRowNames(row);
          const rowType = checkRowType(formattedRow);

          if (rowType === "foodCategoryName")
            return [
              ...acc,
              {
                categoryName: formattedRow?.foodCode,
                tableCategoryIndex: index,
              },
            ];

          return acc;
        },
        []
      );

      const createFoodCategories = async () => {
        await createAllFoodCategories(
          categories?.map((foodCategory) => ({
            name: foodCategory?.categoryName,
          }))
        );
      };

      await createFoodCategories();

      const foodCategories = await Promise.all(
        categories?.map(async (category) => {
          const foodCategory = await getFoodCategoryByName(
            category?.categoryName
          );
          return foodCategory;
        })
      );

      const categoriesWithFoodsAndCategoryId = categories?.map(
        (category, index) => {
          const foodCategoryId = foodCategories?.find(
            (foodCategory) => foodCategory?.name === category?.categoryName
          );

          const isLastItem = index === categories.length;
          if (isLastItem)
            return {
              ...category,
              categoryId: foodCategoryId?.id as string,
              foodItems: formattedRowTables?.slice(
                category?.tableCategoryIndex + 1,
                categories[categories.length - 1]?.tableCategoryIndex
              ),
            };

          return {
            ...category,
            categoryId: foodCategoryId?.id as string,
            foodItems: formattedRowTables?.slice(
              category?.tableCategoryIndex + 1,
              categories[index + 1]?.tableCategoryIndex
            ),
          };
        }
      );

      const fodItemsWithCategories = categoriesWithFoodsAndCategoryId?.reduce(
        (acc: Omit<FoodItem, "id">[], category) => {
          const foodItems = category?.foodItems?.map((foodItem) => ({
            ...foodItem,
            categoryId: category?.categoryId,
          }));

          return [...acc, ...foodItems];
        },
        [] as Omit<FoodItem, "id">[]
      );

      await createAllFoodItems(fodItemsWithCategories);

      return new NextResponse(JSON.stringify(fodItemsWithCategories), {
        headers: getHeaders(req),
        status: 200,
      });
    } catch (error) {
      new NextResponse("There's been an error creating the Food Item", {
        headers: getHeaders(req),
        status: 400,
      });
    }
  });
