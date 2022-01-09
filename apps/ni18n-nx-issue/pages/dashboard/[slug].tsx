import { UiLibsDashboard } from '@ni18n-nx-issue/ui-libs/dashboard';
import { loadTranslations } from 'ni18n';
import { ni18nConfig } from '../../ni18n.config';

const DashboardSlug = () => <UiLibsDashboard />;

export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'slug' } }],
    fallback: true,
  };
}

export const getStaticProps = async ({ locale }) => {
  const loadedTranslationsSSP = {
    ...(await loadTranslations(ni18nConfig, locale, ['common', 'dashboard'])),
  };

  console.log({
    where: 'getStaticProps',
    locale,
    ni18nConfig: JSON.stringify(ni18nConfig),
    loadedTranslationsSSP: JSON.stringify(loadedTranslationsSSP),
  });

  return {
    props: { ...loadedTranslationsSSP },
  };
};

export default DashboardSlug;
