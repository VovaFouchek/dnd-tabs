import styles from './layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header />
      <main className={styles.inner}>
        <aside className={styles.sidebar} />
        <section className={styles.content}>{children}</section>
      </main>
    </>
  );
};

export default Layout;
