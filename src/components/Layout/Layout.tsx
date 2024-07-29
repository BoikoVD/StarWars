import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';
import { StarfieldBg } from '../StarfieldBg/StarfieldBg';

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
      <StarfieldBg/>
    </div>
  );
};