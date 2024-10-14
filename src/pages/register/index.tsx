import { useTranslate } from '@refinedev/core';
import { Card, Steps, Typography } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitch } from '../../core';
import { usePublicRegisterContext, withRegisterContext } from './contexts';
import { CheckForm, ControlForm, RegisterInfoForm } from './forms';
import './styles.css';
import { RegisterSteps } from './types';

const steps = [
  { title: 'Проверка' },
  { title: 'Ввод данных' },
  { title: 'Верификация' },
];

const { Text } = Typography;

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
    <div className="background-register">
      <div
        style={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          margin: '0 10px',
        }}
      >
        <ThemeSwitch />
      </div>
      <div className="content-register">
        <Card style={{ width: 500 }}>
          <p className="register__title">
            {translate('pages.register.title', 'Регистрация')}
          </p>
          <Steps current={step} size="small">
            {stepItems}
          </Steps>
          {step === RegisterSteps.Check && <CheckForm />}
          {step === RegisterSteps.RegisterInfo && <RegisterInfoForm />}
          {step === RegisterSteps.Control && <ControlForm />}
          <div
            style={{
              marginTop: '10px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link
              style={{
                color: 'black',
                textAlign: 'center',
              }}
              to={'/login'}
            >
              <Text>Войти</Text>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
});
