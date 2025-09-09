import { FC } from 'react';
import { Avatar as AntAvatar, AvatarProps } from 'antd';

// import { AvatarProps } from './type';

export const Avatar: FC<AvatarProps> = ({ src, shape = 'circle', ...props }) => {
  return <AntAvatar {...props} src={src} shape={shape} />;
};

Avatar.displayName = 'Avatar';
