import { ReactNode } from 'react';
import classNames from 'classnames';

import { useCollapsed, useSetCollapsed } from '~features/shared/collapse';
import { XIcon } from '~shared/ui/Icons';

import styles from './authSider.module.scss';

interface AuthSiderProps {
  children?: ReactNode;
}

export const AuthSider: React.FC<AuthSiderProps> = ({ children }) => {
  const collapsed = useCollapsed();
  const setCollapsed = useSetCollapsed();

  const bgClass = classNames(styles.bg, !collapsed ? styles.closedBg : '');
  const siderClass = classNames(styles.collapsed, !collapsed ? styles.closed : '');

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  if (collapsed) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return (
    <div className={bgClass} onClick={handleCollapse}>
      <div className={siderClass}>
        <div onClick={handleCollapse}>
          <div className="flex justify-end h-[80px] items-center">
            <XIcon />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};
