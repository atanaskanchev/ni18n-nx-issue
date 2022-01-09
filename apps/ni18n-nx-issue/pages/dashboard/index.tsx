import { UiLibsDashboard } from '@ni18n-nx-issue/ui-libs/dashboard';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

console.log('file: index.tsx ~ line 4 ~ ni18nConfig', ni18nConfig);

const Dashboard = () => <UiLibsDashboard />;

export const getServerSideProps = async ({ locale }) => {
  const something = {
    ...(await loadTranslations(ni18nConfig, locale, ['common', 'dashboard'])),
  };
  console.log(
    'file: index.tsx ~ line 9 ~ getServerSideProps ~ something',
    something
  );

  return {
    props: something,
  };
};

export default Dashboard;
