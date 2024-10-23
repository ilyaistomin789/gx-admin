import { RequestQueryBuilder } from '@nestjsx/crud-request';
import type { DataProvider } from '@refinedev/core';

import { handleSort, transformHttpError } from '@refinedev/nestjsx-crud';
import type { AxiosInstance } from 'axios';
import { stringify } from 'query-string';
import {
  GetManyRequestType,
  handleFilter,
  handleJoin,
  handlePagination,
} from '@core';

export const customMediaDataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance,
): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    RequestQueryBuilder.setOptions({
      paramNamesMap: {
        limit: 'pageSize',
        offset: 'nextPageState',
        sort: 'orderFieldName',
      },
    });

    const requestType = meta?.requestType ?? GetManyRequestType.GetList;

    const resourcePath =
      requestType === GetManyRequestType.GetList ? 'get-list' : 'get-all';

    const url = `${apiUrl}/${resource}/${resourcePath}`;

    let query = RequestQueryBuilder.create();

    query = handleFilter(query, filters);
    query = handleJoin(query, meta?.join);
    query = handlePagination(query, pagination);
    query = handleSort(query, sorters);

    const { data } = await httpClient.get(`${url}?${query.query()}`);

    if (requestType === GetManyRequestType.GetAll) {
      return {
        data: data.data,
        total: data.data.length,
      };
    }

    // without pagination
    if (Array.isArray(data)) {
      return {
        data,
        total: data.length,
      };
    }
    // with pagination
    return {
      isLastPage: data.data.isLastPage,
      nextPageState: data.data.nextPageState,
      pageSize: data.data.pageSize,
      resultSet: data.data.resultSet,
      data: data.data.resultSet,
      total: data.data.total,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await httpClient.post(`${url}/get-many`, {
      ids: [...new Set(ids)],
    });

    return {
      data: data.data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}/upload`;

    try {
      const { data } = await httpClient.post(url, variables);

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/update/${id}`;

    try {
      const { data } = await httpClient.patch(url, variables);

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  createMany: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}/upload-many`;

    try {
      const { data } = await httpClient.post(url, { bulk: variables });

      return {
        data,
      };
    } catch (error) {
      const httpError = transformHttpError(error);

      throw httpError;
    }
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/get-one/${id}`;

    let query = RequestQueryBuilder.create();

    query = handleJoin(query, meta?.join);

    const { data } = await httpClient.get(`${url}?${query.query()}`);

    return {
      data: data.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/delete-one/${id}`;

    const { data } = await httpClient.delete(url);

    return {
      data,
    };
  },

  deleteMany: async ({ resource, ids }) => {
    const { data } = await httpClient.post(
      `${apiUrl}/${resource}/delete-many`,
      ids,
    );
    return { data: data };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    meta,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestQueryBuilder = RequestQueryBuilder.create();

    requestQueryBuilder = handleFilter(requestQueryBuilder, filters);

    requestQueryBuilder = handleJoin(requestQueryBuilder, meta?.join);

    requestQueryBuilder = handleSort(requestQueryBuilder, sorters);

    let requestUrl = `${url}?${requestQueryBuilder.query()}`;

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](url, payload, {
          headers,
        });
        break;
      case 'delete':
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers,
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, { headers });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
