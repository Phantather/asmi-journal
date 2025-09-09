import { useNotification } from '~shared/ui';

import { AppProps } from '../types';

export const withNotification = (component: Component) => (props: AppProps) => {
  const notification = useNotification();

  return (
    <>
      {notification.contextHolder}
      {component(props)}
    </>
  );
};
