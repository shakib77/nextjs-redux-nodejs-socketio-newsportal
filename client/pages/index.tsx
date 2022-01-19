import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import HomePage from "../module/homePage";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Next js Socket.io News Post"/>
            </Head>

            <main className={styles.main}>
                <HomePage/>
            </main>

            <footer className={styles.footer}>
                <a>
                    Copy right by shaon

                </a>
            </footer>
        </div>
    )
}

export default Home
