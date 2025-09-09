import { Modal } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { signOut } from '../../api';

export interface SignOutViewProps {
  onSignOut: () => void;
}

export const SignOutView: React.FC<SignOutViewProps> = ({ onSignOut }) => {
  const { t } = useTranslation();
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    confirm({
      title: <h2>Предупреждение!</h2>,
      content: <p>Вы действительно хотите выйти?</p>,
      async onOk() {
        await handleSignOut();
      },
      async onCancel() {
        await onCancel();
      },
    });
  }, []);

  const handleSignOut = useCallback(async () => {
    setLoading(true);

    try {
      onSignOut();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [onSignOut]);

  const onCancel = () => {
    navigate(-1);
  };

  return null;
};
