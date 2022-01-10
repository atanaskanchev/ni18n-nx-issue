import { UiLibsDashboard } from '@ni18n-nx-issue/ui-libs/dashboard';
import { loadTranslations } from 'ni18n';
import path from 'path';
import { ni18nConfig } from '../../ni18n.config';

const Dashboard = () => <UiLibsDashboard />;

export const getServerSideProps = async ({ locale }) => {
  path.join('./locales');
  const ssr = {
    ...(await loadTranslations(ni18nConfig, locale, ['common', 'dashboard'])),
  };

  console.log({ ssr: JSON.stringify(ssr), ni18nConfig, locale });

  return {
    props: ssr,
  };
};

export default Dashboard;
