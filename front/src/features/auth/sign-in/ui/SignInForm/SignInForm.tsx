import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { Button, Form, Input, Typography, useNotification } from '~shared/ui';
import { useTranslation } from '~shared/lib/i18n';
import { RoutesUrls } from '~shared/lib/router';

import { signIn } from '../../api';
import { SignInData } from '../../model';

const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME;
// const USER_DATA = import.meta.env.VITE_USER_DATA;

export interface SignInFormProps {}

export const SignInForm: React.FC<SignInFormProps> = () => {
  const notification = useNotification();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSignInSuccess = (data: any) => {
    const { token, tokenType, expiresIn } = data;
    const tokenFull = `${token}`;

    Cookies.set(TOKEN_NAME, tokenFull, { expires: expiresIn / 3600 / 24, secure: true });

    navigate(RoutesUrls.adminPanelNews);
  };

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { data, error, message } = await signIn({
        login: form.getFieldValue('login')?.trim(),
        password: form.getFieldValue('password')?.trim(),
      });

      if (error || !data) {
        throw new Error(message || 'Sign in failed');
      }

      handleSignInSuccess(data);
    } catch (err) {
      console.error('Sign-in error:', err);

      notification.openNotification({
        message: t('cm:notify.wrongLoginOrPassword'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-10">
      {notification.contextHolder}
      <Typography.Title level={4} className="text-center">
        Вход
      </Typography.Title>
      <Form onFinish={handleSignIn} form={form}>
        <Form.Item rules={[{ required: true }]} name="login">
          <Input placeholder="Логин" />
        </Form.Item>
        <Form.Item rules={[{ required: true }]} name="password">
          <Input type="password" placeholder="Пароль" />
        </Form.Item>
        <Button type="primary" size="large" htmlType="submit" className="w-full" loading={loading}>
          Войти
        </Button>
      </Form>
    </div>
  );
};
