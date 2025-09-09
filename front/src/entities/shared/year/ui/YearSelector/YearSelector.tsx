import { SelectProps } from 'antd';
import { FC } from 'react';

import { YearItem } from '~entities/shared/year/model';

import { Select } from '~shared/ui';

export interface YearSelectorProps extends SelectProps {
  value?: number;
  yearsList: YearItem[];
}

export const YearSelector: FC<YearSelectorProps> = ({ value, yearsList, ...props }) => {
  return (
    <Select
      value={value}
      options={yearsList.map((item) => {
        return {
          value: item.id_year,
          label: item.sh_years,
        };
      })}
      {...props}
    />
  );
};
