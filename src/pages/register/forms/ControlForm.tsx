import { useRegister, useTranslate } from "@refinedev/core";
import { Form, Input } from "antd";
import { SignUpRequest } from "../../../data";
import { FormAccessButton } from "../../../core";
import { usePublicRegisterContext } from "../contexts";

export const ControlForm = () => {
  const [form] = Form.useForm<Pick<SignUpRequest, "verificationCode">>();
  const translate = useTranslate();
  const { values } = usePublicRegisterContext();

  const { mutate: register, isLoading } = useRegister();

  const handleSignUp = () => {
    const { verificationCode } = form.getFieldsValue();
    const { email, firstName, lastName, password, phone } = values;
    register({
      verificationCode,
      email,
      firstName,
      lastName,
      password,
      phone,
    });
  };

  return (
    <Form className="register__form" form={form}>
      <Form.Item
        name="verificationCode"
        label={translate("pages.register.fields.verificationCode", "Код")}
        rules={[
          {
            required: true,
            message: translate(
              "pages.register.errors.verificationCode",
              "Введите код"
            ),
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>
      <FormAccessButton
        form={form}
        onClick={handleSignUp}
        type="primary"
        size="large"
        loading={isLoading}
        block
      >
        {translate("pages.register.confirm", "Создать")}
      </FormAccessButton>
    </Form>
  );
};
