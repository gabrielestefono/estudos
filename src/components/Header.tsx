import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
        <div>
          <img src="/icons/logo.svg" alt="Logotipo da Todo List" width="128px" height="48px"/>
        </div>
    </header>
  );
}