import React from "react";
import Head from "next/head";
import Router from "next/router";
import { Icon, Button, Card, Image } from "semantic-ui-react";
import styles from "@/styles/Home.module.css";

function Home() {
  return (
    <>
      <Head>
        <title>RRMS Helper</title>
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <Card.Group>
            <Card>
              <Card.Content>
                <Card.Header>Service</Card.Header>
                <Card.Description>
                  Contains table of accounts requiring service
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  basic
                  fluid
                  color="green"
                  onClick={() => Router.push("/service")}
                >
                  Go to Service
                </Button>
              </Card.Content>
            </Card>
          </Card.Group>
        </main>
      </div>
    </>
  );
}

export default Home;
