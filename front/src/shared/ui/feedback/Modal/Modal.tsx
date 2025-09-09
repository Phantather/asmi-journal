import { FC } from 'react';
import { Modal as AntModal, ModalProps as AntModalProps } from 'antd';

interface ModalProps extends AntModalProps {
  open?: boolean;
}

export const Modal: FC<ModalProps> = ({ open, ...props }) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return <AntModal open={open} {...props} />;
};
