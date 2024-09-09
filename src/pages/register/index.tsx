import { AuthPage } from "@refinedev/antd";
import "./styles.css";
import { Steps } from "antd";
import { useMemo } from "react";
import { useTranslate } from "@refinedev/core";
import { usePublicRegisterContext, withRegisterContext } from "./contexts";
import { CheckForm, ControlForm, RegisterInfoForm } from "./forms";
import { RegisterSteps } from "./types";
import { Link } from "react-router-dom";

const steps = [
  { title: "Проверка" },
  { title: "Ввод данных" },
  { title: "Верификация" },
];

export const Register = withRegisterContext(() => {
  const translate = useTranslate();
  const { step } = usePublicRegisterContext();

  const stepItems = useMemo(() => {
    return steps.map((s, index) => {
      const disabled = index !== step;

      return (
        <Steps.Step disabled={disabled} key={s.title + index} title={s.title} />
      );
    });
  }, [step]);

  return (
    <div className="background">
      <div className="register">
        <p className="register__title">
          {translate("pages.register.title", "Регистрация")}
        </p>
        <Steps current={step} size="small">
          {stepItems}
        </Steps>
        {step === RegisterSteps.Check && <CheckForm />}
        {step === RegisterSteps.RegisterInfo && <RegisterInfoForm />}
        {step === RegisterSteps.Control && <ControlForm />}
        <div
          style={{
            marginTop: "10px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            style={{
              color: "black",
              textAlign: "center",
            }}
            to={"/login"}
          >
            Войти
          </Link>
        </div>
      </div>
    </div>
  );
});
