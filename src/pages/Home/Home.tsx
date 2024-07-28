import { useLayoutEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch } from "../../store/store";
import { fetchPeople } from "../../store";
import { PeopleList } from "../../components";
import styles from './Home.module.css';

export function Home() {
  const { page } = useParams();
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(fetchPeople(Number(page)));
  }, [page]);

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <PeopleList />
      </section>
    </main>
  );
};