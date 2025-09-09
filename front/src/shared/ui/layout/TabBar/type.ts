import { CSSProperties, ReactNode } from 'react';

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
