import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Header, Button, Divider, Grid } from 'semantic-ui-react'

const Nav = () => (
  <div>
<Container text fluid>
<Header as="h1" textAlign="center">
Readable
</Header>
</Container>
<Divider/>
<br/>
<Container>
<Grid floated right columns={4}>
    <Grid.Column>
   <Link to="/posts/new"> <Button primary>Add Post</Button></Link>
    </Grid.Column>
</Grid>
</Container>
</div>
);

export default Nav;