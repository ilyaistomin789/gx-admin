import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { LoginRequest } from "../../../data";
import { LoginSteps } from "../types";

export interface PublicLoginContextType {
  values: LoginRequest;
  step: LoginSteps;
}

export type LoginContextType = PublicLoginContextType & {
  internal_setValue(
    key: keyof LoginContextType,
    value: Partial<LoginContextType[typeof key]>
  ): void;
};

const LoginContext = React.createContext<LoginContextType>({
  values: {
    email: "",
    password: "",
    verificationCode: "",
  },
  step: LoginSteps.Auth,
  internal_setValue: null!,
});

export const useLoginContext = () =>
  useContext(LoginContext) as LoginContextType;

export const usePublicLoginContext = () =>
  useContext(LoginContext) as PublicLoginContextType;

export const LoginContextProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState<LoginRequest>({} as LoginRequest);
  const [step, setStep] = useState<LoginSteps>(LoginSteps.Auth);

  const internal_setValue = useCallback(
    (key: keyof LoginContextType, value: LoginContextType[typeof key]) => {
      switch (key) {
        case "values":
          setValues((prev) => ({ ...prev, ...(value as LoginRequest) }));
          break;
        case "step":
          setStep(value as LoginSteps);
          break;
        default:
          break;
      }
    },
    [setStep]
  );

  return (
    <LoginContext.Provider
      value={{
        internal_setValue,
        values,
        step,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const withLoginContext =
  <T,>(Component: React.ComponentType<T>) =>
  (props: T & JSX.IntrinsicAttributes) => {
    return (
      <LoginContextProvider>
        <Component {...props} />
      </LoginContextProvider>
    );
  };
