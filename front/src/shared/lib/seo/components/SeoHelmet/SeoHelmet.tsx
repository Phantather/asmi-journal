import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

interface SeoHelmetProps {
  title?: string | null;
  descriptionKey?: string;
  keywordsKey?: string;
  image_url?: string;
}

export const SeoHelmet: React.FC<SeoHelmetProps> = ({
  title = '',
  descriptionKey = 'hyundai, hyundai центр кыргызстан, официальный дилер hyundai в кыргызстане',
  image_url,
}) => {
  const { t, i18n } = useTranslation();

  const defaultTitle = 'Hyundai';
  const currentTitle = `${title}`;

  const MAIN_TITLE = currentTitle ?? defaultTitle;

  const MAIN_DESCRIPTION = descriptionKey;

  const FAVICON_URL = `${window.location.origin}/${
    import.meta.env.VITE_BASE
  }/assets/favicon-96x96.png`;

  const MAIN_IMAGE_URL = image_url ?? FAVICON_URL;

  return (
    <Helmet>
      <title>{MAIN_TITLE}</title>
      <meta name="description" content={MAIN_DESCRIPTION} />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href={window.location.href} />
      <meta httpEquiv="Content-Language" content={i18n.language} />
      {/* Facebook Meta Tags */}
      <meta property="og:site_name" content={MAIN_TITLE} />
      <meta property="og:locale" content={i18n.language} />
      <meta property="og:title" content={MAIN_TITLE} />
      <meta property="og:description" content={MAIN_DESCRIPTION} />
      <meta property="og:image" itemProp="image" content={MAIN_IMAGE_URL} />
      <meta property="og:url" content={window.location.href} />
      {/* Twitter Meta Tags */}
      <meta name="twitter:title" content={MAIN_TITLE} />
      <meta name="twitter:description" content={MAIN_DESCRIPTION} />
      <meta name="twitter:domain" content={window.location.host} />
      <meta name="twitter:url" content={window.location.href} />
      <meta name="twitter:image" content={MAIN_IMAGE_URL} />
      <meta name="twitter:card" content="Phantather" />
    </Helmet>
  );
};
