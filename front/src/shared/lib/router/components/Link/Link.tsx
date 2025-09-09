import { forwardRef } from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import styles from './link.module.css';

export interface LinkProps extends RouterLinkProps {}

export const Link: React.FC<LinkProps> = forwardRef(({ ...props }, _ref: any) => {
  return <RouterLink {...props} className={styles.link} />;
});

Link.displayName = 'Link';
