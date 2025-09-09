import { CSSProperties, ReactNode } from 'react';
import classNames from 'classnames';

import useScrollListener from '~shared/lib/hooks/useScrollListener';

import styles from './tabbar.module.scss';

export interface TabBarProps {
  user?: ReactNode;
  routes?: ReactNode;
  links?: ReactNode;
  settings?: ReactNode;
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  collapsed?: boolean;
  collapsedWidth?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  reverseArrow?: boolean;
  style?: CSSProperties;
  theme?: 'light' | 'dark';
  trigger?: ReactNode;
  width?: number | string;
  zeroWidthTriggerStyle?: object;
}

export const TabBar: React.FC<TabBarProps> = ({ routes }) => {
  const scroll = useScrollListener();
  const btnClass = classNames(
    styles.wrapper,
    scroll.y > 150 && scroll.y - scroll.lastY > 0 ? styles.hidden : ''
  );

  return (
    <div className={btnClass}>
      <div className={styles.innerWrapper}>{routes}</div>
    </div>
  );
};
