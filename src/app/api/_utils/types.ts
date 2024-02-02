export type FoodItem = {
  id: string;
  calories: number;
  cooking_method: string;
  protein: number;
  carbs: number;
  fibers: number;
  categoryId: string;
};

export type FoodCategory = {
  id: string;
  name: string;
  fodItems: FoodItem[];
};
