import { useNavigate, useLocation } from 'react-router-dom';
import LogoImage from '../../../assets/images/logo.webp';
import BackArrowIcon from '../../../assets/icons/back_icon.svg';
import styles from './Header.module.css';

export function Header() {
  const navigation = useNavigate();
  const location = useLocation();

  const goBackHandler = () => {
    navigation(-1);
  }

  const goHomeHandler = () => {
    navigation('/');
  }

  return (
    <header className={styles.header}>
      {location.pathname.includes('/person') && 
        <button className={styles.goBackBtn} onClick={goBackHandler}>
          <img src={BackArrowIcon} alt="icon"/>
          <span>Go Back</span>
        </button>}
      {location.pathname.includes('/404') && 
        <button className={styles.goBackBtn} onClick={goHomeHandler}>
          Go Home
        </button>}
      <div className={styles.logo}>
        <img src={LogoImage} alt="Star Wars logo" />
      </div>
    </header>
  );
};