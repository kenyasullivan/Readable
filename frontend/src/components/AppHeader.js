import React from "react";
import {
  Container,
  Header,
  Divider,
  Menu,
  Button,
  Dropdown
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const AppHeader = () => (
  <div>
    <Container text fluid>
      <Header as="h1" textAlign="center">
        Readable
      </Header>
    </Container>
    <Divider />

    <br />
  </div>
);

export default AppHeader;
