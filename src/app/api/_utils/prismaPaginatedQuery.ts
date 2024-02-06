import prisma from "../_config/db";
import { PrismaClient } from "@prisma/client";

const PAGE_SIZE = 10;

type PrismaPaginatedQuery = {
  pageSize?: number;
  pageNumber?: number;
};

type PrismaQueryProps = {
  model: keyof PrismaClient;
  queryOptions: { [key: string]: any };
};

const prismaPaginatedQuery = ({
  pageSize = PAGE_SIZE,
  pageNumber = 1,
}: PrismaPaginatedQuery) => {
  const offset = (pageNumber - 1) * pageSize;

  return async ({ model, queryOptions = {} }: PrismaQueryProps) => {
    const paginatedPrisma = await (prisma[model] as any)?.findMany({
      take: pageSize,
      skip: offset,
      ...queryOptions,
    });
    return paginatedPrisma;
  };
};

export default prismaPaginatedQuery;
