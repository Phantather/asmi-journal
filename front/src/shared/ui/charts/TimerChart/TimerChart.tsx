import { FC } from 'react';
import { VictoryPie } from 'victory';

import styles from './timer.module.scss';

interface TmerProps {
  total?: number | 0;
  value?: number | 0;
  label?: string;
}

export const TimerChart: FC<TmerProps> = ({ total = 100, value = 0, label = '' }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}>
        <VictoryPie
          labelComponent={<p>{value}</p>}
          innerRadius={170}
          cornerRadius={10}
          radius={200}
          data={[
            { key: 'value', y: total - (total - value) },
            { key: 'total', y: total - value },
          ]}
          colorScale={['#B57CFF', '#F8F9FA']}
        />
        <h3 className={styles.value}>{value}</h3>
      </div>
      <h3 className={styles.label}>{label}</h3>
    </div>
  );
};
