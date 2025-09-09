import { FC } from 'react';

import { Spin } from 'antd';

export const CircularProgress: FC = () => {
  return (
    <Spin tip="Loading" size="large">
      <div className="content" />
    </Spin>
  );
};
