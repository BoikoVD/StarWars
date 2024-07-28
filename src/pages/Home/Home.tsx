import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchPeople } from "../../store";
import { PeopleList } from "../../components";
import styles from './Home.module.css';

export function Home() {
  const { data, isLoading, error } = useAppSelector(state => state.people);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!data && !isLoading) {
      dispatch(fetchPeople());
    }
  }, []);

  return (
    <main>
      <section>
        {isLoading
          ? <div>Loading...</div>
          : error
            ? <div>Error: {error}</div>
            : <PeopleList peopleData={data?.results} />
        }
      </section>
    </main>
  );
};