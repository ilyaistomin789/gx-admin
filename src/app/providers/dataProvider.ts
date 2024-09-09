import axios from "axios";
import { AUTH_SERVICE_URL, STORE_SERVICE_URL } from "../config";
import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import { DataProviders } from "@refinedev/core";

export const dataProviders: DataProviders = {
  default: nestjsxCrudDataProvider(STORE_SERVICE_URL),
  auth: nestjsxCrudDataProvider(
    AUTH_SERVICE_URL,
    axios.create({
      baseURL: AUTH_SERVICE_URL,
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    })
  ),
};
