import { FC, ReactNode } from 'react';

import classNames from 'classnames';

import styles from './siderLink.module.scss';

interface SiderLinkProps {
  title?: string;
  path?: string;
  icon?: ReactNode;
  collapsed?: boolean;
}

export const SiderLink: FC<SiderLinkProps> = ({ title, path = '/', icon, collapsed }) => {
  const btnClass = classNames(styles.wrapper, collapsed ? styles.iconly : styles.titlely);

  return (
    <a href={path} target="_blank" rel="noreferrer" className={btnClass}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
    </a>
  );
};
