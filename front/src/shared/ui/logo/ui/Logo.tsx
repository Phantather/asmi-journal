import classNames from 'classnames';

import { useTranslation } from '~shared/lib/i18n';

import Logotype from '../assets/logo.svg';

import styles from './Logo.module.scss';

export interface LogoProps {
  collased?: boolean;
}

export const Logo = ({ collased = true }) => {
  const { t } = useTranslation();
  const wrapperClass = classNames(styles.wrapper, !collased ? styles.closed : '');

  return (
    <div className={wrapperClass}>
      {/*<img className={styles.logo} src={Logotype} alt="logo" />*/}
      <h2 className={styles.title}>HYUNDAI</h2>
    </div>
  );
};
