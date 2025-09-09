// import { IntlProvider, useLocaleProvider } from '~shared/lib/l10n';
// import '~shared/lib/i18n';
import { i18nInit } from '~shared/lib/i18n/i18n';

import { AppProps } from '../types';

i18nInit(['cm', 'site', 'seo', 'auth'], 'ru', 'cm');

export const withLocalization = (component: Component) => (props: AppProps) => {
  // const intlProviderProps = useLocaleProvider();

  return component(props);
  // return <IntlProvider {...intlProviderProps}>{component(props)}</IntlProvider>;
};
