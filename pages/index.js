import Head from "next/head";
import excuteQuery from "@/lib/db";
import { Icon, Table } from "semantic-ui-react";
import styles from "@/styles/Home.module.css";

function Home({ queue, issues }) {
  return (
    <>
      <Head>
        <title>RRMS Helper</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="3">Service Queue</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell collapsing>
                  <Icon name="folder" /> node_modules
                </Table.Cell>
                <Table.Cell>Initial commit</Table.Cell>
                <Table.Cell collapsing textAlign="right">
                  10 hours ago
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from db
  const queue = await excuteQuery({
    query: "SELECT * from queue",
  });
  const issues = await excuteQuery({
    query: "SELECT * from issues",
  });
  // Pass data to the page via props
  return { props: { queue: queue, issues: issues } };
}

export default Home;
