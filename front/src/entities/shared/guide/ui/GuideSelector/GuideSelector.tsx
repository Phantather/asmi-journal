import { SelectProps } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Select } from '~shared/ui';
import { GuideItem } from '~entities/shared/guide/model';

export interface GuidesSelectorProps extends SelectProps {
  value?: string;
  guideList: GuideItem[] | null;
}

export const GuideSelector: FC<GuidesSelectorProps> = ({ value, guideList, ...props }) => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={value}
      options={guideList?.map((item) => {
        return {
          value: item.id_guide,
          label: item.guide_name,
        };
      })}
      {...props}
    />
  );
};
