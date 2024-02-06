import { NextRequest, NextResponse } from "next/server";
import limitRoute from "../../_utils/limitNumberOfRequests";
import getHeaders from "../../_utils/getHeaders";
import getFoodItemByName from "../_utils/getFoodItemByName";

// export const GET = async (req: Request, { params }: TemplateRouteContext) =>
//   await limitRoute(async () => {
//     const { templateId } = params;

//     if (!templateId)
//       return new NextResponse(null, {
//         headers: getHeaders(req),
//         status: 404,
//         statusText: "You need to send a valid template template id",
//       });

//     const template = await getTemplateById(templateId as string);

//     if (!template) {
//       return new NextResponse(null, {
//         headers: getHeaders(req),
//         status: 404,
//         statusText: "Template not found",
//       });
//     } else {
//       return new NextResponse(JSON.stringify(template), {
//         headers: getHeaders(req),
//         status: 201,
//       });
//     }
//   });

// export const DELETE = async (req: Request, { params }: TemplateRouteContext) =>
//   limitRoute(async () => {
//     const { templateId } = params;
//     if (!templateId)
//       return new NextResponse(null, {
//         headers: getHeaders(req),
//         status: 404,
//         statusText: "You need to send a valid template template id",
//       });

//     const deleteTemplate = await deleteTemplateById(templateId);

//     if (!deleteTemplate) {
//       return new NextResponse(null, {
//         headers: getHeaders(req),
//         status: 404,
//         statusText: "Template not found",
//       });
//     } else {
//       return new NextResponse(null, {
//         headers: getHeaders(req),
//         status: 201,
//         statusText: "Template deleted successfully",
//       });
//     }
//   });

// export const PUT = async (req: Request, { params }: TemplateRouteContext) =>
//   limitRoute(async () => {
//     const { templateId } = params;
//     if (!templateId)
//       return new NextResponse(null, {
//         headers: getHeaders(req),
//         status: 404,
//         statusText: "You need to send a valid template template id",
//       });
//     const templateData = await req.json();
//     const { elements, background } = templateData;

//     const updatedTemplate = await updateTemplateById({
//       templateId,
//       background,
//       elements,
//     });

//     if (!updatedTemplate) {
//       return new NextResponse(null, {
//         headers: getHeaders(req),
//         status: 404,
//         statusText: "Template not found",
//       });
//     } else {
//       return new NextResponse(JSON.stringify(updatedTemplate), {
//         headers: getHeaders(req),
//         status: 404,
//         statusText: "Template not found",
//       });
//     }
//   });

export const GET = async (req: NextRequest) =>
  limitRoute(async () => {
    const orderByQuery = req?.nextUrl?.searchParams.get("order") as any;
    const pageNumberQuery = req?.nextUrl?.searchParams.get("page");
    const pageNumber = pageNumberQuery ? +pageNumberQuery : undefined;
    const foodName = req?.nextUrl?.searchParams.get("foodName");
    if (!!foodName?.length && foodName?.length <= 3) {
      // No body in the request
      return new NextResponse("Food Name is too short", {
        headers: getHeaders(req),
        status: 400,
      });
    }

    if (!!foodName) {
      const createdFoodItem = await getFoodItemByName({
        foodItemName: foodName,
        pageNumber,
        orderBy: orderByQuery,
      });

      return new NextResponse(JSON.stringify(createdFoodItem), {
        headers: getHeaders(req),
        status: 200,
      });
    }

    const allFoodItems = await getFoodItemByName({
      foodItemName: "",
      pageNumber,
      orderBy: orderByQuery,
    });
    return new NextResponse(JSON.stringify(allFoodItems), {
      headers: getHeaders(req),
      status: 200,
    });
  });
