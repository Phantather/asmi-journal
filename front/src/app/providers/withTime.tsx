import { dayjs } from '~shared/lib/time';
import { i18n } from '~shared/lib/i18n';

import { AppProps } from '../types';

dayjs.locale(i18n.language || 'ru'); // set locale default

setTimeout(() => {
  if (dayjs.locale() !== i18n.language) {
    dayjs.locale(i18n.language); // set locale if not loaded
  }
}, 500);

export const withTime = (component: Component) => (props: AppProps) => {
  return component(props);
};
