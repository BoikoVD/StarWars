import styles from './ErrorMessageBox.module.css';

interface PropsModel {
    errorMessage: string,
}

export function ErrorMessageBox(props: PropsModel) {
    const { errorMessage } = props;

    return (
        <div className={styles.boxWrapper}>
            <p>An ERROR occurred:</p>
            <p className={styles.errorMessage}>{errorMessage}</p>
            <a href='/' className={styles.toHomepageLink}>Go to Home Page</a>
        </div>
    );
};