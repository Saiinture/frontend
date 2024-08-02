import styles from "./Typing.module.css";

const Typing = () => {
  return (
    <>
    <div className={styles.container}>

      <div className={styles.dot_typing}>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
        <span className={styles.dot}></span>
      </div>
      Typing
    </div>
    </>
  );
};

export default Typing;
