import React from "react";
import Head from "next/head";
import excuteQuery from "@/lib/db";
import Router from "next/router";
import {
  Icon,
  Table,
  Button,
  Header,
  Modal,
  Form,
  Dropdown,
  Grid,
  Message,
} from "semantic-ui-react";
import styles from "@/styles/Home.module.css";
import EmailModal from "@/components/EmailModal";

{
  /* Returns the rows for the queue table */
}
function QueueRows({ list }) {
  if (list.length > 0) {
    return [
      { Account: "Test Account", Issue: "Test Issue" },
      { Account: "Test Account 2", Issue: "Test Issue 2" },
    ].map((element) => {
      return (
        <Table.Row>
          <Table.Cell collapsing>{"Account Number Here"}</Table.Cell>
          <Table.Cell collapsing>
            {"Name Hereeeeeeeeeeeeeeeeeeeeeeeeeeee"}
          </Table.Cell>
          <Table.Cell>{"Issue Here"}</Table.Cell>
          <Table.Cell collapsing>
            <Button icon="trash" color="red" onClick={() => {}} />
          </Table.Cell>
        </Table.Row>
      );
    });
  } else {
    return (
      <Table.Row>
        <Table.Cell>No sites currently in the queue</Table.Cell>
      </Table.Row>
    );
  }
}

function Home({ queue, issues }) {
  const [open, setOpen] = React.useState(false);
  const [sites, setSites] = React.useState([]);

  return (
    <>
      <Head>
        <title>RRMS Helper</title>
      </Head>
      <div className={styles.container}>
        <Button
          icon
          labelPosition="left"
          compact
          size="tiny"
          onClick={() => Router.push("/")}
        >
          <Icon name="arrow left" /> Go Back
        </Button>
        <main className={styles.main}>
          <Table celled striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  Service Queue{" "}
                  <Button
                    size="mini"
                    circular
                    icon="plus"
                    color="green"
                    onClick={() => {
                      setSites([]);
                      setOpen(true);
                    }}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <QueueRows list={queue} />
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan="4">
                  <Button
                    floated="right"
                    icon
                    labelPosition="left"
                    primary
                    size="tiny"
                  >
                    <Icon name="mail" /> Generate Email
                  </Button>
                  <Button
                    disabled={true}
                    color="red"
                    size="tiny"
                    icon
                    labelPosition="right"
                  >
                    <Icon name="trash" />
                    Remove All
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>

          <EmailModal
            open={open}
            setOpen={setOpen}
            issues={issues}
            sites={sites}
            setSites={setSites}
          />
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
