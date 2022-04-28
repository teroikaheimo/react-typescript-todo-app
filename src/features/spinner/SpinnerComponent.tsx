import styles from './spinner.module.css';

export function Spinner(){
        return(<div className={styles.root}>
            <div className={styles.spinner}></div>
            </div>)
}