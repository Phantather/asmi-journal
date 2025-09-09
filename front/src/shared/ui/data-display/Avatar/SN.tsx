import { FC } from 'react';

import styles from './sn.module.scss';

interface SNProps {
  surname?: string;
  name?: string;
  size?: number;
}

export const SN: FC<SNProps> = ({ surname = '', name = '', size = 32 }) => {
  const s = surname?.split('')?.[0];
  const n = name?.split('')?.[0];

  return (
    <div style={{ fontSize: size }} className={styles.wrapper}>
      {s?.toUpperCase()}
    </div>
  );
};
