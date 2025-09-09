import { HelmetProvider } from 'react-helmet-async';

// import favicon from '~shared/assets/logo.svg';

import { AppProps } from '../types';

export const withHelmet = (component: Component) => (props: AppProps) => {
  return <HelmetProvider>{component(props)}</HelmetProvider>;
};
// defaultTitle="VSSSR"
// titleTemplate="VSSSR - %s"
// link={[{ rel: 'icon', type: 'image/png', href: favicon }]}
