import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { Header } from './Header/Header';

export function Layout() {
  return (
    <div className={styles.layout}>
      <Header />
      <Outlet />
    </div>
  );
};