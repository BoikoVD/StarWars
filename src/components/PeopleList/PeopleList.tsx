import { PersonModel } from '../../store';
import { PersonCard } from './PersonCard/PersonCard';
import styles from './PeopleList.module.css';

interface PropsModel {
    peopleData?: PersonModel[],
}

export function PeopleList(props: PropsModel) {
    const { peopleData } = props;

    if (!peopleData || !peopleData.length) {
        return null;
    }

    return (
        <ul className={styles.list}>
            {peopleData.map((person) => <li>
                <PersonCard name={person.name}/>
            </li>)}
        </ul>
    );
};