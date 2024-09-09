import { useApiUrl, useCustomMutation, useTranslate } from "@refinedev/core";
import { Button, Form, Input } from "antd";
import { useRegisterContext } from "../contexts";
import { FormAccessButton } from "../../../core";
import {
  CheckEmailRequest,
  CheckEmailResponse,
  DefaultResponse,
} from "../../../data";
import { useEffect } from "react";
import { RegisterSteps } from "../types";

export const CheckForm = () => {
  const translate = useTranslate();
  const { internal_setValue, step } = useRegisterContext();
  const [form] = Form.useForm<CheckEmailRequest>();
  const { mutate, data, isLoading, error, isError } =
    useCustomMutation<DefaultResponse<CheckEmailResponse>>();
  const apiUrl = useApiUrl("auth");

  const values = Form.useWatch([], form);

  const handleCheckEmail = () => {
    mutate({
      url: `${apiUrl}/supervisor-auth/check-email`,
      method: "post",
      values: {
        email: values.email,
      } as CheckEmailRequest,
    });
  };

  useEffect(() => {
    if (data && !data.data.data.isExisted) {
      internal_setValue("values", { email: values.email });
      internal_setValue("step", RegisterSteps.RegisterInfo);
    }
  }, [data]);

  return (
    <Form<CheckEmailRequest>
      form={form}
      className="register__form"
      layout="vertical"
    >
      <Form.Item
        label={translate("pages.register.fields.email", "Электронная почта")}
        name="email"
        rules={[
          {
            required: true,
            message: translate(
              "pages.register.errors.requiredEmail",
              "Обязательное поле"
            ),
          },
          {
            type: "email",
            message: translate(
              "pages.register.errors.validEmail",
              "Неверный формат"
            ),
          },
        ]}
      >
        <Input placeholder="gx@gx.com" />
      </Form.Item>
      <FormAccessButton
        form={form}
        onClick={handleCheckEmail}
        type="primary"
        size="large"
        loading={isLoading}
        block
      >
        {translate("pages.register.confirm", "Подтвердить")}
      </FormAccessButton>
    </Form>
  );
};
