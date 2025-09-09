import React, { ReactNode } from 'react';

import { Typography } from '~shared/ui';

import styles from './labeled.module.scss';

export interface LabeledProps {
  label?: string | null;
  children?: ReactNode;
  required?: boolean;
  message?: string;
  type?: 'danger' | 'success' | 'warning' | 'secondary';
}

export const Labeled: React.FC<LabeledProps> = ({ children, label, required, type, message }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>
        {label} {required && <span className={styles.required}>*</span>}
      </div>
      {children}
      <Typography.Text type={type}>{message}</Typography.Text>
    </div>
  );
};
