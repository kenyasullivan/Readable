import React from "react";

const Nav = () => {
  return (
    <Container>
      <Menu size="tiny">
        <Menu.Item>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">React</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">Redux</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">Udacity</Link>
        </Menu.Item>

        <Menu.Menu position="right">
          <Dropdown item text="Sort By:">
            <Dropdown.Menu>
              <Dropdown.Item>Time</Dropdown.Item>
              <Dropdown.Item>Vote</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item>
            <Link to="/posts/new">
              {" "}
              <Button primary>Add Post</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Container>
  );
};

export default Nav;
