import { notification } from 'antd';
import type { ArgsProps } from 'antd/es/notification/interface';
interface INotification extends ArgsProps {
  // status: 'success' | 'error' | 'warning';
}

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = ({ type, message, ...props }: INotification) => {
    api.open({
      ...props,
      type,
      message,
      placement: props?.placement || 'topRight',

      duration: props?.duration || 3,
    });
  };

  const closeNotification = () => api.destroy();

  return { openNotification, closeNotification, contextHolder };
};
