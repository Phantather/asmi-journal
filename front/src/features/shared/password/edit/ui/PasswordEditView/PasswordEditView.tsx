import { FC, useState } from 'react';

import { useTranslation } from '~shared/lib/i18n/i18n';
import { Button, Form, Input, useNotification } from '~shared/ui';

import { updatePassword } from '../../api';

export interface PasswordEditViewProps {}

export const PasswordEditView: FC<PasswordEditViewProps> = ({}) => {
  const { t } = useTranslation();
  const notification = useNotification();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const onValueChange = () => {
    if (
      !form.getFieldValue('oldPassword') ||
      !form.getFieldValue('newPassword') ||
      !form.getFieldValue('passwordConfirm')
    ) {
      setDisabled(true);
    } else if (form.getFieldValue('newPassword') === form.getFieldValue('passwordConfirm')) {
      setDisabled(false);
    }
  };

  const onFinish = async () => {
    setLoading(true);
    const data = {
      oldPassword: form.getFieldValue('oldPassword'),
      newPassword: form.getFieldValue('newPassword'),
    };

    const response = await updatePassword(data);

    if (!response?.error) {
      setLoading(false);

      notification.openNotification({
        message: t('notify.succesSaved'),
        type: 'success',
      });

      form.resetFields();
    }

    if (response?.error) {
      setLoading(false);

      notification.openNotification({
        message: response?.message,
        type: 'error',
      });
    }
  };

  return (
    <div className="grid gap-5 w-full">
      {notification.contextHolder}
      <p>{t(`auth:form.changePassword`)}</p>
      <Form
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        onChange={onValueChange}
      >
        <Form.Item name="oldPassword" rules={[{ required: true, message: t('notify.full') || '' }]}>
          <Input placeholder={t('auth:form.password') || ''} disabled={loading} />
        </Form.Item>

        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: t('notify.full') || '' }]}
          className="mt-10"
        >
          <Input placeholder={t('auth:form.newPassword') || ''} disabled={loading} />
        </Form.Item>
        <Form.Item
          name="passwordConfirm"
          dependencies={['newPassword']}
          rules={[
            {
              required: true,
              message: t('notify.full') || '',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(new Error(t('notify.passWordConfirmError') || ''));
              },
            }),
          ]}
        >
          <Input placeholder={t('auth:form.passwordConfirm') || ''} disabled={loading} />
        </Form.Item>
        <div className="grid gap-6">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            disabled={disabled}
            loading={loading}
          >
            {t('actions.save')}
          </Button>
        </div>
      </Form>
    </div>
  );
};
