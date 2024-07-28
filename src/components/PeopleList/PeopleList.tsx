import { useAppSelector } from '../../store';
import { PersonCard } from './PersonCard/PersonCard';
import styles from './PeopleList.module.css';
import { PeopleListPagination } from './PeopleListPagination/PeopleListPagination';
import { ErrorMessageBox } from './ErrorMessageBox/ErrorMessageBox';

export function PeopleList() {
    const { data, error } = useAppSelector(state => state.people);

    return (
        <>
            {error
                ? <ErrorMessageBox errorMessage={error} />
                : data?.results && data.results.length
                    ? <ul className={styles.list}>
                        {data?.results && data.results.map((person) => <li key={person.id}>
                            <PersonCard name={person.name} />
                        </li>)}
                    </ul>
                    : <div className={styles.noData}>No Data</div>}
            <PeopleListPagination />
        </>
    );
};