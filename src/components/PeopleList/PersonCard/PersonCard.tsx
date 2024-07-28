import styles from './PersonCard.module.css';

interface PropsModel {
    name: string,
}

export function PersonCard(props: PropsModel) {
    const { name } = props;

    return (
        <a href='/404' className={styles.personCard}>
            {name}
        </a>
    );
};