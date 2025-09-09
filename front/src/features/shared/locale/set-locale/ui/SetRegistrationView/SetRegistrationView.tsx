import { useTranslation } from '~shared/lib/i18n';
import { dayjs } from '~shared/lib/time';
import { Select } from '~shared/ui';

import { LocaleCodes } from '../../model';

export interface SetRegistrationViewProps {}

export const SetRegistrationView: React.FC<SetRegistrationViewProps> = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleLocaleChange = (value: string) => {
    dayjs.locale(value);
    localStorage.setItem('lang', value);
    i18n.changeLanguage(value);
    window.location.reload();
  };

  const langList = [
    { value: LocaleCodes.RUSSIAN, label: t('auth:buttons.ru') },
    { value: LocaleCodes.KYRGYZ, label: t('auth:buttons.ky') },
    { value: LocaleCodes.ENGLISH, label: t('auth:buttons.en') },
  ];

  return (
    <Select
      className="h-[34px] !border-none"
      value={lang}
      onChange={handleLocaleChange}
      options={langList}
      size="middle"
    />
  );
};
