// import { FC, forwardRef } from 'react';
import { FC, ReactNode } from 'react';

import styles from './box.module.scss';

export interface BoxProps {
  children?: React.ReactNode;
  styles?: any;
  title?: string | ReactNode;
  padding?: number | string;
  borderRadius?: number | string;
  component?: React.ElementType;
}

export const Box: FC<BoxProps> = ({ title, children, padding, borderRadius }) => {
  return (
    <div className={styles.box} style={{ padding: padding, borderRadius: borderRadius }}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

Box.displayName = 'Box';
