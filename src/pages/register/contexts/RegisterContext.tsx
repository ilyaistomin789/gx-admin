import React, {
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";
import { SignUpRequest } from "../../../data";
import { RegisterSteps } from "../types";

export interface PublicRegisterContextType {
  values: SignUpRequest;
  step: RegisterSteps;
}

export type RegisterContextType = PublicRegisterContextType & {
  internal_setValue(
    key: keyof RegisterContextType,
    value: Partial<RegisterContextType[typeof key]>
  ): void;
};

const RegisterContext = React.createContext<RegisterContextType>({
  values: {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    verificationCode: "",
  },
  step: RegisterSteps.Check,
  internal_setValue: null!,
});

export const useRegisterContext = () =>
  useContext(RegisterContext) as RegisterContextType;

export const usePublicRegisterContext = () =>
  useContext(RegisterContext) as PublicRegisterContextType;

export const RegisterContextProvider = ({ children }: PropsWithChildren) => {
  const [values, setValues] = useState<SignUpRequest>({} as SignUpRequest);
  const [step, setStep] = useState<number>(0);

  const internal_setValue = useCallback(
    (
      key: keyof RegisterContextType,
      value: RegisterContextType[typeof key]
    ) => {
      switch (key) {
        case "values":
          setValues((prev) => ({ ...prev, ...(value as SignUpRequest) }));
          break;
        case "step":
          setStep(value as RegisterSteps);
          break;
        default:
          break;
      }
    },
    [setStep]
  );

  return (
    <RegisterContext.Provider
      value={{
        internal_setValue,
        values,
        step,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export const withRegisterContext =
  <T,>(Component: React.ComponentType<T>) =>
  (props: T & JSX.IntrinsicAttributes) => {
    return (
      <RegisterContextProvider>
        <Component {...props} />
      </RegisterContextProvider>
    );
  };
