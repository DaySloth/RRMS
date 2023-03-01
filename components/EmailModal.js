import React from "react";
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

async function searchAccounts(accountNumber) {
  const result = await (await fetch(`/api/stores/search/${accountNumber}`))
    .json()
    .then((data) => data);
  return result;
}

{
  /* Returns the rows for the account search table */
}
function SearchTable({ list }) {
  if (list.stores) {
    if (list.stores.length > 0) {
      return (
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Account Number</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Add?</Table.HeaderCell>
            </Table.Row>
            {list.stores.map((element) => {
              return (
                <Table.Row>
                  <Table.Cell collapsing>{element.Account}</Table.Cell>
                  <Table.Cell collapsing>{element["Account Name"]}</Table.Cell>
                  <Table.Cell collapsing textAlign="center">
                    <Button
                      size="mini"
                      icon="plus"
                      color="blue"
                      onClick={() => {}}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Header>
        </Table>
      );
    } else {
      return (
        <Message color="red" size="mini">
          <Message.Header>No sites found</Message.Header>
        </Message>
      );
    }
  } else {
    return <></>;
  }
}

function EmailModal({ open, setOpen, issues, sites, setSites }) {
  const [modalSite, setModalSite] = React.useState("");

  return (
    <>
      {/* Adding site to service queue */}
      <Modal
        closeIcon
        open={open}
        onClose={() => {
          setSites([]);
          setOpen(false);
        }}
        onOpen={() => setOpen(true)}
      >
        <Header icon="archive" content="Add site to queue" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Site Number</label>
              <input
                placeholder="#12345"
                onChange={(e, data) => {
                  setModalSite(e.target.value);
                }}
              />
              <Button
                attached="bottom"
                color="blue"
                size="mini"
                onClick={async () => {
                  const accounts = await searchAccounts(modalSite);

                  setSites(accounts);
                }}
                loading={false}
              >
                <Icon name="search" /> Search
              </Button>
            </Form.Field>

            <SearchTable list={sites} />

            <Form.Field>
              <label>Issue</label>
              <Dropdown fluid search selection options={issues} />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => setOpen(false)}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" onClick={() => setOpen(false)}>
            <Icon name="checkmark" /> Add to Queue
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default EmailModal;
