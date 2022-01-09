import { UiLibsDashboard } from '@ni18n-nx-issue/ui-libs/dashboard';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

const Dashboard = () => <UiLibsDashboard />;

export const getServerSideProps = async ({ locale }) => {
  const loadedTranslationsSSP = {
    ...(await loadTranslations(ni18nConfig, locale, ['common', 'dashboard'])),
  };

  console.log({
    where: 'getServerSideProps',
    locale,
    ni18nConfig: JSON.stringify(ni18nConfig),
    loadedTranslationsSSP: JSON.stringify(loadedTranslationsSSP),
  });

  return {
    props: { ...loadedTranslationsSSP },
  };
};

export default Dashboard;
