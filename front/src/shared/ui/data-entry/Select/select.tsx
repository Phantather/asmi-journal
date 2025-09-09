import { FC } from 'react';
import { Select as AntSelect, SelectProps } from 'antd';

import { ArrowIcon } from '~shared/ui/Icons/icons';
import { useTranslation } from '~shared/lib/i18n';

export const Select: FC<SelectProps> = ({
  size = 'large',
  suffixIcon = <ArrowIcon />,
  placeholder,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <AntSelect
      size={size}
      suffixIcon={suffixIcon}
      {...props}
      placeholder={placeholder || t('actions.select')}
    />
  );
};
