import styles from "../Styles/Loader.module.css";

export default function Loader() {
  return (
    <div className="bg-[#1c1c1c] h-[100vh] w-[100vw] fixed top-0 z-[100] grid items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
}
