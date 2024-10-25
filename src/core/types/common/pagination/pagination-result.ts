import { Nullable } from '../../nullable';

export interface PaginationBody<T> {
  pageSize: number;
  nextPageState?: Nullable<string>;
  isLastPage: boolean;
  resultSet: T[];
  total?: number;
}

export class PaginationResult<T> {
  public pageSize: number;
  public nextPageState: Nullable<string>;
  public isLastPage: boolean;
  public resultSet: T[];
  public total?: number;

  constructor({
    isLastPage,
    nextPageState,
    pageSize,
    resultSet,
    total,
  }: PaginationBody<T>) {
    this.pageSize = pageSize;
    this.nextPageState = nextPageState
      ? // ? encodeURIComponent(CryptoJS.AES.encrypt(nextPageState, config.PAGE_STATE_SECRET).toString())
        nextPageState
      : null;
    this.isLastPage = isLastPage;
    this.resultSet = resultSet;
    this.total = total;
  }
}
