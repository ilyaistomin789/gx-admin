import { FormAccessButton } from '@core';
import { LoginRequest } from '@data';
import { useLogin, useTranslate } from '@refinedev/core';
import { Form, Input } from 'antd';
import { usePublicLoginContext } from '../contexts';

export const ControlForm = () => {
  const [form] = Form.useForm<Pick<LoginRequest, 'verificationCode'>>();
  const translate = useTranslate();
  const { values } = usePublicLoginContext();

  const { mutate: login, isLoading } = useLogin();

  const handleSignUp = () => {
    const { verificationCode } = form.getFieldsValue();
    const { email, password } = values;
    login({
      verificationCode,
      email,
      password,
    });
  };

  return (
    <Form className="login__form" form={form}>
      <Form.Item
        name="verificationCode"
        label={translate('pages.login.fields.verificationCode', 'Код')}
        rules={[
          {
            required: true,
            message: translate(
              'pages.login.errors.verificationCode',
              'Введите код',
            ),
          },
        ]}
      >
        <Input.OTP />
      </Form.Item>
      <FormAccessButton
        form={form}
        onClick={handleSignUp}
        type="primary"
        size="large"
        loading={isLoading}
        block
      >
        {translate('pages.login.enter', 'Войти')}
      </FormAccessButton>
    </Form>
  );
};
