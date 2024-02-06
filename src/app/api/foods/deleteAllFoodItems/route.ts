import limitRoute from "../../_utils/limitNumberOfRequests";
import deleteAllFoodItems from "../_utils/deleteAllFoodItems";

export const DELETE = async (req: Request) =>
  limitRoute(async () => {
    await deleteAllFoodItems();
  });
