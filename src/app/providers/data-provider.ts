import { DataProviders } from '@refinedev/core';
import axios from 'axios';
import {
  AUTH_SERVICE_URL,
  MEDIA_SERVICE_URL,
  STORE_SERVICE_URL,
} from '../config';
import {
  customMediaDataProvider,
  customNestJsDataProvider,
} from './implementations';

export const dataProviders: DataProviders = {
  default: customNestJsDataProvider(
    STORE_SERVICE_URL,
    axios.create({
      baseURL: STORE_SERVICE_URL,
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    }),
  ),
  auth: customNestJsDataProvider(
    AUTH_SERVICE_URL,
    axios.create({
      baseURL: AUTH_SERVICE_URL,
      withCredentials: true,
      headers: {
        'Content-type': 'application/json',
      },
    }),
  ),
  media: customMediaDataProvider(
    MEDIA_SERVICE_URL,
    axios.create({
      baseURL: AUTH_SERVICE_URL,
      withCredentials: true,
      headers: { 'Content-type': 'multipart/form-data' },
    }),
  ),
};
