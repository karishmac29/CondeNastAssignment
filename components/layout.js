import styles from "../styles/layout.module.scss";
import Head from "next/head";
import Link from "next/link";

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>UK News App</title>
        <meta name="description" content="Learn how to build a personal website using Next.js" />
      </Head>

      <header className={styles.header}>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export default Layout;
