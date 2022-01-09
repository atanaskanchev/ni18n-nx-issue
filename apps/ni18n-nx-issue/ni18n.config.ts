import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import path from 'path';

const isBrowser = typeof window !== 'undefined';
console.log('file: ni18n.config.ts ~ line 6 ~ isBrowser', isBrowser);

const isRunningOnLocalhost =
  !!process.env['NEXT_PUBLIC_IS_RUNNING_ON_LOCALHOST'];
console.log(
  'file: ni18n.config.ts ~ line 9 ~ isRunningOnLocalhost',
  isRunningOnLocalhost
);

const localePath = '{{lng}}/{{ns}}';

export const ni18nConfig = {
  supportedLngs: ['en'],
  ns: ['common', 'auth', 'dashboard'],
  use: isBrowser ? [ChainedBackend] : undefined,
  defaultNS: 'common',
  fallbackLng: 'en',

  backend: isBrowser
    ? {
        backends: [LocalStorageBackend, HttpBackend],
        backendOptions: [
          { expirationTime: 24 * 60 * 60 * 1000 },
          { loadPath: `locales/${localePath}` },
        ],
      }
    : isRunningOnLocalhost
    ? { loadPath: `apps/ni18n-nx-issue/public/locales/${localePath}` }
    : {
        loadPath:
          path.join(process.cwd(), './static/locales') + `/${localePath}.json`,
      },

  // localePath: path.resolve('./public/static/locales'),

  interpolation: {
    format: (value, format, lng, options) => {
      switch (format) {
        case 'number':
          return new Intl.NumberFormat(lng).format(value);
        case 'date':
          return new Intl.DateTimeFormat(options?.locale).format(
            new Date(value)
          );
        case 'datetime':
          return new Intl.DateTimeFormat(options?.locale).format(
            new Date(value)
          );
        case 'currency':
          return options?.currency
            ? new Intl.NumberFormat(options?.locale, {
                style: 'currency',
                currency: options?.currency,
                minimumFractionDigits: 0,
              }).format(value)
            : value;

        default:
          return value;
      }
    },
    escapeValue: false, // react already safes from xss
    react: {
      useSuspense: false,
    },
  },
};
