import { FC } from 'react';

import { useTranslation } from '~shared/lib/i18n/i18n';
import { Labeled, Select } from '~shared/ui';

interface LangItemProps {
  label: string;
  value: number;
}

export interface LangSelectorProps {
  onLangSelect: ((value: any) => void) | undefined;
  value: number | null;
  label: string;
  langList: LangItemProps[];
  required?: boolean;
}

export const LangSelector: FC<LangSelectorProps> = ({
  onLangSelect,
  value,
  langList,
  label,
  required,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <Labeled label={label} required={required}>
      <Select
        value={value}
        onChange={onLangSelect}
        options={langList.map((lang) => {
          return { value: lang.value, label: t(lang.label) };
        })}
        {...props}
      />
    </Labeled>
  );
};
