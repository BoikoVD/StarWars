import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { pathKeys } from '../../../utils/routesConfig';
import styles from './PeopleListPagination.module.css';

export function PeopleListPagination() {
    const { currentPage, totalPages } = useAppSelector(state => state.people);
    const navigator = useNavigate();

    const prevHandler = () => {
        if (currentPage <= 1) {
            return;
        }
        navigator(pathKeys.people.bySlug({ slug: currentPage - 1 }));
    };

    const nextHandler = () => {
        if (currentPage >= totalPages) {
            return;
        }
        navigator(pathKeys.people.bySlug({ slug: currentPage + 1 }));
    };

    return (
        <div className={styles.paginationContainer}>
            <button 
                disabled={currentPage === 1}
                className={styles.changePageButton}
                onClick={prevHandler}
            >
                Prev
            </button>
            <p>
                {currentPage}
            </p>
            <button 
                disabled={currentPage >= totalPages}
                className={styles.changePageButton}
                onClick={nextHandler}
            >
                Next
            </button>
        </div>
    );
};