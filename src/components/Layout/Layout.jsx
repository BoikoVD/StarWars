import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div>
            Logo
        </div>
      </header>
      <Outlet />
    </div>
  );
};