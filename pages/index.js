import React from 'react'
import Head from "next/head";
import excuteQuery from "@/lib/db";
import { Icon, Table, Button, Header, Modal, Form, Dropdown, Grid } from "semantic-ui-react";
import styles from "@/styles/Home.module.css";

{/* Returns the rows for the queue table */}
function Rows({ list }) {
  if (list.length == 0) {
    return (
      [{ Account: "Test Account", Issue: "Test Issue" }, { Account: "Test Account 2", Issue: "Test Issue 2" }].map(element => {
        return (
          <Table.Row>
            <Table.Cell collapsing>{"Account Number Here"}</Table.Cell>
            <Table.Cell collapsing>{"Name Hereeeeeeeeeeeeeeeeeeeeeeeeeeee"}</Table.Cell>
            <Table.Cell>
              {"Issue Here"}
            </Table.Cell>
            <Table.Cell collapsing>
              <Button icon='trash' color="red" onClick={() => { }} />
            </Table.Cell>
          </Table.Row>
        )
      }))

  } else {
    return (
      <Table.Row>
        <Table.Cell>No sites currently in the queue</Table.Cell>
      </Table.Row>
    )
  }

}


function Home({ queue, issues }) {
  const [open, setOpen] = React.useState(false)
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
                <Table.HeaderCell colSpan="4">Service Queue <Button size="mini" circular icon='plus' color="green" onClick={() => setOpen(true)} /></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Rows
                list={queue}
              />
            </Table.Body>
            <Table.Footer fullWidth>
              <Table.Row>
                <Table.HeaderCell colSpan='4'>
                  <Button
                    floated='right'
                    icon
                    labelPosition='left'
                    primary
                    size='tiny'
                  >
                    <Icon name='mail' /> Generate Email
                  </Button>
                  <Button disabled={true} color="red" size='tiny' icon labelPosition='right'>
                    <Icon name='trash' />Remove All
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>



          {/* Adding site to service queue */}
          <Modal
            closeIcon
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          >
            <Header icon='archive' content='Add site to queue' />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Site Number</label>
                  <input placeholder='#12345' />
                  <Button attached="bottom" color='blue' size="mini" onClick={() => { }} loading={false}>
                    <Icon name='search' /> Search
                  </Button>
                </Form.Field>
                <Form.Field>
                  <label>Issue</label>
                  <Dropdown
                    fluid
                    search
                    selection
                    options={issues}
                  />
                </Form.Field>

              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button color='red' onClick={() => setOpen(false)}>
                <Icon name='remove' /> Cancel
              </Button>
              <Button color='green' onClick={() => setOpen(false)}>
                <Icon name='checkmark' /> Add to Queue
              </Button>
            </Modal.Actions>
          </Modal>
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
