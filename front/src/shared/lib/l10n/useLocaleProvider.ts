import { useState } from 'react';

import { LocaleCodes, locales as commonLocales, defaultLocale } from './locales';
// interface ILocaleProvider {
//   // userLocale?: LocaleCodes;
//   messages?: any;
// }

// let userLocale = defaultLocale;

export const useLocaleProvider = (messages?: any) => {
  const [userLocale, setUserLocale] = useState(defaultLocale);

  const mysetUserLocale = (val: LocaleCodes) => {
    // // eslint-disable-next-line no-console
    // console.log({ val, userLocale });

    setUserLocale(val);
  };

  const localeMessages = messages
    ? { ...commonLocales[userLocale], ...messages[userLocale] }
    : commonLocales[userLocale];

  return {
    locale: userLocale,
    messages: localeMessages,
    setUserLocale: mysetUserLocale,
  };
};
