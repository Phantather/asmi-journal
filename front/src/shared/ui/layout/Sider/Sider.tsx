import classNames from 'classnames';

import { useCollapsed, useSetCollapsed } from '~features/shared/collapse';
import { SiderArrowIcon, XIcon } from '~shared/ui/Icons';
import { Logo } from '~shared/ui/logo';
import { useWindowInnerWidth } from '~shared/ui/utils';

import styles from './sider.module.scss';

import { SiderProps } from './type';

export const Sider: React.FC<SiderProps> = ({ user, routes, settings }) => {
  const collapsed = useCollapsed();
  const windowWidth = useWindowInnerWidth();

  const setCollapsed = useSetCollapsed();

  const bgClass = classNames(styles.bg, !collapsed ? styles.closedBg : '');
  const siderClass = classNames(styles.collapsed, !collapsed ? styles.closed : '');
  const collapseBtnClass = classNames(
    styles.collapseButton,
    !collapsed ? styles.collapseButtonClosed : ''
  );

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  // Mobile
  if (windowWidth <= 768) {
    return (
      <div className={bgClass} onClick={handleCollapse}>
        <div className={siderClass}>
          <div className="grid gap-5">
            <div className="flex justify-end h-[70px] items-center" onClick={handleCollapse}>
              <XIcon />
            </div>
            {user}
          </div>
          <div>{routes}</div>
          <div className={styles.settings_logout}>{settings}</div>
        </div>
      </div>
    );
  }

  // Default
  return (
    <div className={bgClass}>
      <div className={siderClass}>
        <div>
          <div className={styles.user_logo}>
            <div className="flex justify-between items-center w-full">
              <div className={!collapsed ? 'hidden' : 'flex ml-[-8px]'}>
                <Logo collased={collapsed} />
              </div>
              <button className={collapseBtnClass} onClick={handleCollapse}>
                <SiderArrowIcon />
              </button>
            </div>
            {user}
          </div>
          <div className={styles.routes}>{routes}</div>
        </div>
        <div className={styles.settings_logout}>{settings}</div>
      </div>
    </div>
  );
};
