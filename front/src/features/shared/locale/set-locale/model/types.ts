export enum LocaleCodes {
  ENGLISH = 'en',
  KYRGYZ = 'ky',
  RUSSIAN = 'ru',
}

export type DynamicLocaleType = (typeof LocaleCodes)[keyof typeof LocaleCodes];
