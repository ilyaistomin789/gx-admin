import { Form, Input } from "antd";
import { SendVerificationCodeRequest, SignUpRequest } from "@data";
import { useApiUrl, useCustomMutation, useTranslate } from "@refinedev/core";
import { FormAccessButton } from "@core";
import { useRegisterContext } from "../contexts";
import { RegisterSteps } from "../types";

export const RegisterInfoForm = () => {
  const [form] = Form.useForm<SignUpRequest>();
  const translate = useTranslate();
  const { internal_setValue, values } = useRegisterContext();
  const { mutate } = useCustomMutation();
  const apiUrl = useApiUrl("auth");

  const handleCheckAuth = () => {
    const { email, password, firstName, lastName, phone } =
      form.getFieldsValue();

    internal_setValue("values", {
      email,
      firstName,
      lastName,
      password,
      phone,
    });

    internal_setValue("step", RegisterSteps.Control);

    mutate({
      url: `${apiUrl}/supervisor-auth/send-verification-code`,
      method: "post",
      values: {
        email: values.email,
      } as SendVerificationCodeRequest,
    });
  };
  return (
    <Form<SignUpRequest>
      initialValues={{
        email: values.email,
      }}
      className="register__form"
      layout="vertical"
      form={form}
    >
      <Form.Item
        label={translate("pages.register.fields.email", "Электронная почта")}
        name="email"
      >
        <Input readOnly disabled />
      </Form.Item>
      <Form.Item
        name="password"
        label={translate("pages.register.fields.password", "Пароль")}
        rules={[
          {
            required: true,
            message: translate(
              "pages.register.errors.requiredPassword",
              "Обязательное поле"
            ),
          },
          {
            min: 8,
            message: translate(
              "pages.register.errors.passwordMinLength",
              "Минимальная длина пароля 8 символов"
            ),
          },
        ]}
      >
        <Input
          type="password"
          autoComplete="current-password"
          placeholder="●●●●●●●●"
          size="large"
        />
      </Form.Item>
      <Form.Item
        label={translate("pages.register.fields.phone", "Номер телефона")}
        name="phone"
        rules={[
          {
            required: true,
            message: translate(
              "pages.register.errors.requiredPhone",
              "Обязательное поле"
            ),
          },
        ]}
      >
        <Input placeholder="+375291112233" />
      </Form.Item>
      <Form.Item
        label={translate("pages.register.fields.firstName", "Имя")}
        name="firstName"
        rules={[
          {
            required: true,
            message: translate(
              "pages.register.errors.requiredFirstName",
              "Обязательное поле"
            ),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={translate("pages.register.fields.lastName", "Фамилия")}
        name="lastName"
        rules={[
          {
            required: true,
            message: translate(
              "pages.register.errors.requiredLastName",
              "Обязательное поле"
            ),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <FormAccessButton
        form={form}
        onClick={handleCheckAuth}
        type="primary"
        size="large"
        block
      >
        {translate("pages.register.confirm", "Подтвердить")}
      </FormAccessButton>
    </Form>
  );
};
