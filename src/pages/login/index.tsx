import { AuthPage } from "@refinedev/antd";
import "./styles.css";
import { Steps, Card } from "antd";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLoginContext, withLoginContext } from "./contexts";
import { LoginSteps } from "./types";
import { AuthForm, ControlForm } from "./forms";

const steps = [{ title: "Аутентификация" }, { title: "Верификация" }];

export const Login = withLoginContext(() => {
  const { step } = useLoginContext();
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
      <Card style={{ width: 500 }}>
        <p className="login__title">Вход</p>
        <Steps current={step} size="small">
          {stepItems}
        </Steps>
        {step === LoginSteps.Auth && <AuthForm />}
        {step === LoginSteps.Control && <ControlForm />}
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
            to={"/register"}
          >
            Регистрация
          </Link>
        </div>
      </Card>
    </div>
  );
});
