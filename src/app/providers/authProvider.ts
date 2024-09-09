import type { AuthProvider } from "@refinedev/core";
import axios, { AxiosResponse } from "axios";
import { AUTH_SERVICE_URL } from "../config";
import {
  AuthResponse,
  DefaultResponse,
  LoginRequest,
  LogoutResponse,
  SignUpRequest,
} from "../../data";
import { Supervisor } from "../../core/types";

const client = axios.create({
  baseURL: `${AUTH_SERVICE_URL}`,
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const authProvider: AuthProvider = {
  register: async (dto: SignUpRequest) => {
    const res = await client.post<
      DefaultResponse<AuthResponse>,
      AxiosResponse<DefaultResponse<AuthResponse>>,
      LoginRequest
    >("/supervisor-auth/signup", dto);

    const { data } = res.data;

    if (!data) {
      return {
        success: false,
        error: {
          message: res.data.error.message as string,
          name: "AuthenticationError",
        },
      };
    }

    return {
      success: true,
      redirectTo: "/",
    };
  },

  login: async ({ email, verificationCode, password }: LoginRequest) => {
    if (!((password || email) && verificationCode)) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid email or password",
        },
      };
    }

    const res = await client.post<DefaultResponse<AuthResponse>>("/supervisor-auth/login", {
      email,
      password,
      verificationCode,
    });

    const { data } = res.data;

    if (!data) {
      return {
        success: false,
        error: {
          message: res.data.error.message as string,
          name: "AuthenticationError",
        },
      };
    }

    return {
      success: data.success,
      redirectTo: "/",
    };
  },

  logout: async () => {
    const res = await client.post<DefaultResponse<LogoutResponse>>("/supervisor-auth/logout");

    const { data } = res.data;

    if (!data) {
      return {
        success: false,
      };
    }

    return {
      success: data.success,
      redirectTo: "/login",
      successNotification: {
        message: "Logout Successful",
        description: "You have successfully logged out.",
      },
    };
  },

  check: async () => {
    try {
      const res = await client.get<
        DefaultResponse<Supervisor>,
        AxiosResponse<DefaultResponse<{ isValid: boolean }>>,
        LoginRequest
      >("/supervisor-auth/check-token");

      const { data } = res.data;

      if (!data) {
        return {
          authenticated: false,
          redirectTo: "/login",
          logout: true,
        };
      }

      return { authenticated: data?.isValid };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
        logout: true,
        error: error as Error,
      };
    }
  },

  getPermissions: async () => null,

  getIdentity: async () => {
    try {
      const res = await client.get<
        DefaultResponse<Supervisor>,
        AxiosResponse<DefaultResponse<Supervisor>>,
        LoginRequest
      >("/supervisor/get-current-supervisor");
      const { data } = res.data;

      return {
        id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        avatar: "https://i.pravatar.cc/300",
      };
    } catch {
      return null;
    }
  },

  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return {
        logout: true,
        redirectTo: "/login",
        error,
      };
    }

    return { error };
  },
};
