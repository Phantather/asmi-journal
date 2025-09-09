import { i18n, useTranslation } from '~shared/lib/i18n';
import { dayjs } from '~shared/lib/time';
import { Segmented, useWindowInnerWidth } from '~shared/ui';

import { LocaleCodes } from '../../model';

export interface SetLocaleViewProps {}

export const SetLocaleView: React.FC<SetLocaleViewProps> = () => {
  const { t } = useTranslation();
  const windowWidth = useWindowInnerWidth();

  const handleLocaleChange = (payload: string | number) => {
    i18n.changeLanguage(payload as string);
    dayjs.locale(payload as string);
  };

  return (
    <div className="grid gap-6 w-full">
      <p>{t('locale.language')}</p>
      <div className="flex">
        <Segmented
          onChange={handleLocaleChange}
          size="large"
          defaultValue={i18n.language}
          block={windowWidth < 568}
          className="xs:w-full bg-[#dadada]"
          options={[
            {
              label: <div className="px-3 xs:p-0">{t('locale.kyrgyz')}</div>,
              value: LocaleCodes.KYRGYZ,
            },
            {
              label: <div className="px-3 xs:p-0">{t('locale.russian')}</div>,
              value: LocaleCodes.RUSSIAN,
            },
          ]}
        />
      </div>
    </div>
  );
};
