import styles from "../Styles/Loader.module.css";

export default function Loader() {
  return (
    <div className="fixed top-0 z-[100] grid h-[100vh] w-[100vw] items-center justify-center bg-[#1c1c1c]">
      <div className={styles.loader}></div>
    </div>
  );
}
