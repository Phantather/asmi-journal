import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next, useTranslation } from 'react-i18next';

const localePath =
  import.meta.env.VITE_STAND === 'development'
    ? '/locales/{{lng}}/{{ns}}.json'
    : `/${import.meta.env.VITE_BASE}/locales/{{lng}}/{{ns}}.json`;

function i18nInit(ns: string[] = ['cm'], fallbackLng: string = 'ru', defaultNS: string = 'cm') {
  i18n
    // Подключение бэкенда i18next
    .use(Backend)
    // Автоматическое определение языка
    .use(LanguageDetector)
    // модуль инициализации
    .use(initReactI18next)
    .init({
      // resources,
      backend: {
        // for all available options read the backend's repository readme file
        loadPath: localePath,
      },
      // Стандартный язык
      fallbackLng: fallbackLng,
      debug: false,
      ns: ns,
      defaultNS: defaultNS,
      // Распознавание и кэширование языковых кук
      detection: {
        order: ['querystring', 'cookie', 'localStorage'],
        caches: ['cookie', 'localStorage'],
        lookupQuerystring: 'lang',
        lookupCookie: 'lang',
        lookupLocalStorage: 'lang',
      },
      interpolation: {
        escapeValue: false,
      },
    });
}

export { i18n, i18nInit, useTranslation };
