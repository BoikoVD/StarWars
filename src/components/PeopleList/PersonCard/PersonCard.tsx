import { pathKeys } from '../../../utils/routesConfig';
import styles from './PersonCard.module.css';

interface PropsModel {
    id: number,
    name: string,
}

export function PersonCard(props: PropsModel) {
    const { name, id } = props;

    return (
        <a href={pathKeys.person.bySlug({ slug: id })} className={styles.personCard}>
            {name}
        </a>
    );
};