import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [status, setStatus] = useState();
  const url = "/api/status";
  const { data: result, error } = useSWR(url, fetcher, {
    refreshInterval: 5000,
  });

  if (result && result.result.status !== status) {
    setStatus(result.result.status);
  }

  if (result) {
    if (
      Number(result.result.description.substring(21, 24)) < 31 &&
      Number(result.result.description.substring(21, 24)) > 25 &&
      result.result.status === "error"
    ) {
      console.log("Status à error depuis au moins 30 sec");
    }
    if (
      Number(result.result.description.substring(21, 24)) < 61 &&
      Number(result.result.description.substring(21, 24)) > 55 &&
      result.result.status === "ok"
    ) {
      console.log("Status à ok de nouveau");
    }
  }

  if (error) return <h1>Something went wrong!</h1>;
  if (!result) return <h1>Loading...</h1>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>Status: {status}</main>
    </div>
  );
}
/* export async function getServerSideProps(context) {
  const statusUrl = await fetch(
    `http://localhost:3000/api/status`,
  );
  
  const status = await statusUrl.json();

  return { props: { status } };
} */
