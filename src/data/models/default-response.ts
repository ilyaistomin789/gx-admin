import { ErrorCodes } from "./error-codes";

export interface DefaultResponse<T = object> {
  data: T;
  error: {
    message: string;
    code?: ErrorCodes | string;
    details?: unknown;
  };
}
