import { ReactNode } from 'react';

export interface AvatarProps {
  src?: string | ReactNode;
  alt?: string;
  gap?: number;
  icon?: ReactNode;
  shape?: 'circle' | 'square';
  size?: number | 'large' | 'small' | 'default';
  draggable?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  onError?: () => boolean;
}
