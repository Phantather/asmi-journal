import { Link } from 'react-router-dom';

import { RoutesUrls } from '~shared/lib/router';

import SiteLogotype from '../assets/logo.svg';

import styles from './Logo.module.scss';

export function SiteLogo() {
  return (
    <h1>
      <Link to={RoutesUrls.root} className={styles.wrapper}>
        <img className={styles.logo} src={SiteLogotype} alt="HYUNDAI KG" />
      </Link>
    </h1>
  );
}
