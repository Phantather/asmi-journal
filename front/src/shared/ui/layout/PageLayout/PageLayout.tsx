import { FC, ReactNode } from 'react';

import styles from './pageLayout.module.scss';

interface PageLayoutProps {
  navigation?: ReactNode;
  header?: ReactNode;
  children?: ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = ({ navigation, header, children }) => {
  return (
    <div className={styles.PageLayout}>
      {navigation}
      <div>
        {header}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
