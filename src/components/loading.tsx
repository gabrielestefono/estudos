import styles from './loading.module.scss';

export default function Loading(){
    return (
        <div className={styles.loading}>
            <div>
                <img src="/icons/rocket.svg" width={200} height={200} alt='Rocket'/>
                <img src="/icons/todo.svg" width={300} height={300} alt='Logo'/>
            </div>
        </div>
    )
}