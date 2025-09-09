import { SelectProps } from 'antd';
import { FC } from 'react';

import { ClassItem } from '~entities/shared/class/model';

import { Select } from '~shared/ui';

export interface ClassSelectorProps extends SelectProps {
  value?: string;
  classList: ClassItem[];
}

export const ClassSelector: FC<ClassSelectorProps> = ({ value, classList, ...props }) => {
  return (
    <Select
      value={value}
      options={classList.map((item) => {
        return {
          value: item.id_class,
          label: item.class,
        };
      })}
      {...props}
    />
  );
};
