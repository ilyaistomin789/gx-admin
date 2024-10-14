import { Card, Steps, Typography } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitch } from '../../core';
import { useLoginContext, withLoginContext } from './contexts';
import { AuthForm, ControlForm } from './forms';
import './styles.css';
import { LoginSteps } from './types';

const steps = [{ title: 'Аутентификация' }, { title: 'Верификация' }];

const { Text } = Typography;

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
    <div className="background-login">
      <div
        style={{
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          margin:'0 10px'
        }}
      >
        <ThemeSwitch />
      </div>
      <div className="content-login">
        <Card style={{ width: 500 }}>
          <p className="login__title">Вход</p>
          <Steps current={step} size="small">
            {stepItems}
          </Steps>
          {step === LoginSteps.Auth && <AuthForm />}
          {step === LoginSteps.Control && <ControlForm />}
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
              to={'/register'}
            >
              <Text>Регистрация</Text>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
});
