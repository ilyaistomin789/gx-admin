import { FormAccessButton } from '@core';
import {
  DefaultResponse,
  LoginRequest,
  SendVerificationCodeRequest,
} from '@data';
import {
  CreateResponse,
  useApiUrl,
  useCustomMutation,
  useTranslate,
} from '@refinedev/core';
import { Form, Input } from 'antd';
import { useLoginContext } from '../contexts';
import { LoginSteps } from '../types';

export const AuthForm = () => {
  const apiUrl = useApiUrl('auth');
  const translate = useTranslate();
  const { internal_setValue } = useLoginContext();
  const { mutateAsync, isLoading } = useCustomMutation();
  const [form] = Form.useForm<LoginRequest>();
  const handleCheckAuth = async () => {
    const { email, password } = form.getFieldsValue();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const check: CreateResponse<DefaultResponse<{ isExisted: boolean }>> =
      await mutateAsync({
        url: `${apiUrl}/supervisor-auth/check`,
        method: 'post',
        values: {
          email,
          password,
        } as Omit<LoginRequest, 'verificationCode'>,
      });

    if (check.data.data.isExisted) {
      await mutateAsync({
        url: `${apiUrl}/supervisor-auth/send-verification-code`,
        method: 'post',
        values: {
          email,
        } as SendVerificationCodeRequest,
      });
    }

    internal_setValue('values', { email, password });
    internal_setValue('step', LoginSteps.Control);
  };

  return (
    <Form<LoginRequest> className="login__form" layout="vertical" form={form}>
      <Form.Item
        label={translate('pages.login.fields.email', 'Электронная почта')}
        name="email"
        rules={[
          {
            required: true,
            message: translate(
              'pages.login.errors.requiredEmail',
              'Обязательное поле',
            ),
          },
          {
            type: 'email',
            message: translate(
              'pages.login.errors.validEmail',
              'Неверный формат',
            ),
          },
        ]}
      >
        <Input placeholder="gx@gx.com" />
      </Form.Item>
      <Form.Item
        name="password"
        label={translate('pages.login.fields.password', 'Пароль')}
        rules={[
          {
            required: true,
            message: translate(
              'pages.login.errors.requiredPassword',
              'Обязательное поле',
            ),
          },
          {
            min: 8,
            message: translate(
              'pages.login.errors.passwordMinLength',
              'Минимальная длина пароля 8 символов',
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
      <FormAccessButton
        form={form}
        onClick={handleCheckAuth}
        type="primary"
        size="large"
        loading={isLoading}
        block
      >
        {translate('pages.login.confirm', 'Подтвердить')}
      </FormAccessButton>
    </Form>
  );
};
