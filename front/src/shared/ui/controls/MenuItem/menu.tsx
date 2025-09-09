import { ReactNode } from 'react';

interface MenuItemProps {
  children?: ReactNode;
  value?: string | number;
  dense?: true;
}

const MenuItem = ({ children, ...props }: MenuItemProps) => <div {...props}>{children}</div>;

export { MenuItem };
