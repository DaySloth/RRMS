import React from 'react'
import Head from "next/head";
import excuteQuery from "@/lib/db";
import { Icon, Table, Button, Header, Modal, Form, Dropdown } from "semantic-ui-react";
import styles from "@/styles/Home.module.css";

function Rows({ list }) {
  if (list.length > 0) {
    return <Table.Row>
      <Table.Cell collapsing>
        <Icon name="folder" /> node_modules
      </Table.Cell>
      <Table.Cell>Bigger</Table.Cell>
      <Table.Cell collapsing textAlign="right">
        10 hours ago
      </Table.Cell>
    </Table.Row>
  } else {
    return (
      <Table.Row>
        <Table.Cell>Nothing here</Table.Cell>
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
                <Table.HeaderCell colSpan="3">Service Queue <Button size="mini" circular icon='plus' color="green" onClick={() => setOpen(true)} /></Table.HeaderCell>
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
                    size='small'
                  >
                    <Icon name='user' /> Add User
                  </Button>
                  <Button size='small'>Approve</Button>
                  <Button disabled={true} size='small'>
                    Approve All
                  </Button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          </Table>
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
