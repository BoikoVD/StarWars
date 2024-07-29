import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchPersonData } from "../../store";
import styles from './PersonDetails.module.css';
import { PersonDetailsFlow } from "../../components";

export function PersonDetails() {
  const { id } = useParams();
  const { personData, isLoading } = useAppSelector(state => state.person);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchPersonData(Number(id)));
    }
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <main className={styles.main}>
      <section className={styles.section}>
        {personData
          ? <PersonDetailsFlow />
          : 'No Data'}
      </section>
    </main>
  );
};