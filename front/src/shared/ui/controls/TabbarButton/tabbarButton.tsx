import classNames from 'classnames';
import { FC, ReactEventHandler, ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './tabbarButton.module.scss';

interface TabbarButtonProps {
  title?: string;
  path?: string;
  icon?: ReactNode;
  onClick?: ReactEventHandler;
}

export const TabbarButton: FC<TabbarButtonProps> = ({ path = '/', icon, onClick }) => {
  const btnClass = (isActive: boolean) => {
    return classNames(styles.wrapper, isActive ? styles.active : '');
  };

  return (
    <NavLink className={({ isActive }) => btnClass(isActive)} to={path} onClick={onClick}>
      {icon}
    </NavLink>
  );
};
