import { FC, ReactEventHandler, ReactNode } from 'react';

import { Tooltip, Typography, useWindowInnerWidth } from '~shared/ui';

import { UseIcon } from './useIcon';
import { UseColor } from './useColor';
import styles from './fileButton.module.scss';

interface FileButtonProps {
  title?: string;
  href?: string;
  target?: string;
  rel?: string;
  key?: string;
  icon?: ReactNode;
  collapsed?: boolean;
  onClick?: ReactEventHandler;
}

export const FileButton: FC<FileButtonProps> = ({
  title = 'file',
  href = '/',
  target,
  rel = 'noreferrer',
  key,
  onClick,
}) => {
  return (
    <Tooltip title={title} color={UseColor(title)} key={key}>
      <a href={href} onClick={onClick} target={target} rel={rel} className={styles.wrapper}>
        <div className={styles.title}>
          {UseIcon(title)}
          <Typography.Text
            ellipsis
            style={{ width: useWindowInnerWidth() <= 410 ? 150 : '', color: UseColor(title) }}
          >
            {title}
          </Typography.Text>
        </div>
        <div className={styles.bg} style={{ background: UseColor(title) }} />
      </a>
    </Tooltip>
  );
};
