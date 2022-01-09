import { useTranslation } from 'react-i18next';

/* eslint-disable-next-line */
export interface UiLibsDashboardProps {}

export function UiLibsDashboard(props: UiLibsDashboardProps) {
  const { t } = useTranslation(['dashboard']);

  return (
    <div>
      <h1>Welcome to UiLibsDashboard!</h1>
      <hr />
      <p>
        {t('app_name', {
          ns: 'common',
          appName: 'ni18n',
        })}
      </p>
      <hr />
      <p>
        {t('page_name', {
          ns: 'dashboard',
          pageName: 'Dashboard page',
        })}
      </p>
    </div>
  );
}

export default UiLibsDashboard;
