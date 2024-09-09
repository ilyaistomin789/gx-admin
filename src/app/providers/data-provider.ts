import axios from "axios";
import { AUTH_SERVICE_URL, STORE_SERVICE_URL } from "../config";
import { DataProviders } from "@refinedev/core";
import { customNestJsDataProvider } from "./implementations";

export const dataProviders: DataProviders = {
  default: customNestJsDataProvider(STORE_SERVICE_URL),
  auth: customNestJsDataProvider(
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
