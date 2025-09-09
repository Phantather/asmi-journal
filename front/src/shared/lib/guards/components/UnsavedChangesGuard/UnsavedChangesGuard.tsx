import { FC, ReactNode, useEffect, useState } from 'react';

import { Modal } from '~shared/ui';

export interface UnsavedChangesGuardProps {
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  hasUnsavedChanges: boolean;
}

export const UnsavedChangesGuard: FC<UnsavedChangesGuardProps> = ({
  children,
  onConfirm,
  onCancel,
  hasUnsavedChanges,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasUnsavedChanges) {
      setVisible(true);

      const handleBeforeUnload = (event: BeforeUnloadEvent) => {
        const message = 'У вас есть несохраненные изменения. Хотите покинуть страницу?';
        event.returnValue = message;

        return message;
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    }

    setVisible(false);
  }, [hasUnsavedChanges]);

  const handleConfirm = () => {
    onConfirm();
    setVisible(false);
  };

  const handleCancel = () => {
    onCancel();
    setVisible(false);
  };

  return (
    <>
      {children}
      <Modal
        open={visible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText="Подтвердить"
        cancelText="Отмена"
      >
        <p>У вас есть несохраненные изменения. Хотите продолжить?</p>
      </Modal>
    </>
  );
};
