export interface PaginationQuery<
  T extends string | undefined | number = string | undefined,
> {
  pageSize: number;
  nextPageState: T;
}
