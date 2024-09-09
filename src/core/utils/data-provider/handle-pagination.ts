import type { Pagination } from "@refinedev/core";
import type { RequestQueryBuilder } from "@nestjsx/crud-request";

export const handlePagination = (
  query: RequestQueryBuilder,
  pagination?: Pagination
) => {
  const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};

  if (mode === "server") {
    query.setLimit(pageSize).setOffset((current - 1) * pageSize);
  }

  return query;
};
