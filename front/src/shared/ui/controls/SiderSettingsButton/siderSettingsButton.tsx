import classNames from 'classnames';
import { FC, ReactEventHandler, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { Tooltip } from '~shared/ui';

import styles from './siderSettingsButton.module.scss';

interface SiderSettingsButtonProps {
  title?: string;
  path?: string;
  icon?: ReactNode;
  collapsed?: boolean;
  isBlank?: boolean;
  onClick?: ReactEventHandler;
}

export const SiderSettingsButton: FC<SiderSettingsButtonProps> = ({
  title,
  path = '/',
  icon,
  collapsed = false,
  isBlank,
  onClick,
}) => {
  const btnClass = (isActive: boolean) => {
    return classNames(
      styles.wrapper,
      collapsed ? styles.collapsed : '',
      isActive ? styles.active : ''
    );
  };

  return (
    <Tooltip title={!collapsed ? title : null} placement="left" color="var(--stroke)">
      <NavLink
        target={isBlank ? '_blank' : '_self'}
        onClick={onClick}
        className={({ isActive }) => btnClass(isActive)}
        to={path || '/'}
      >
        <div className={styles.icon}>{icon}</div>
        <p className={`${styles.name} ${collapsed && styles.nameShow}`}>{title}</p>
      </NavLink>
    </Tooltip>
  );
};
