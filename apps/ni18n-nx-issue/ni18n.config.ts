import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

const isBrowser = typeof window !== 'undefined';

const isRunningOnLocalhost =
  !!process.env['NEXT_PUBLIC_IS_RUNNING_ON_LOCALHOST'];

const localePath = '{{lng}}/{{ns}}.json';

console.log({
  isBrowser,
  isRunningOnLocalhost,
});

export const ni18nConfig = {
  supportedLngs: ['en'],
  ns: ['common', 'auth', 'dashboard', 'property', 'tenancy', 'payment'],

  ...(isBrowser && {
    use: [ChainedBackend],
  }),

  fallbackLng: 'en',

  backend: {
    ...(isBrowser && {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [{ expirationTime: 24 * 60 * 60 * 1000 }],
    }),

    ...(isRunningOnLocalhost && {
      loadPath: `apps/ni18n-nx-issue/public/locales/${localePath}`,
    }),
  },

  interpolation: {
    format: (value, format, lng, options) => {
      switch (format) {
        case 'number':
          return new Intl.NumberFormat(lng).format(value);
        case 'date':
          return new Intl.DateTimeFormat(options?.locale, {}).format(
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
  },
};
