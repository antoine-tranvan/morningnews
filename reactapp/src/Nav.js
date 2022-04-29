import React from "react";
import "./App.css";
import { Menu, Dropdown, message, Icon } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Nav(props) {
  return (
    <nav>
      <Menu style={{ textAlign: "center" }} mode="horizontal" theme="dark">
        <Menu.Item key="mail">
          <Link to="/screensource">
            <Icon type="home" />
            By Sources
          </Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/screenlatest">
            <Icon type="read" />
            Latest by Category
          </Link>
        </Menu.Item>

        <Menu.Item key="test">
          <Link to="/screenmyarticles">
            <Icon type="read" />
            My Articles
          </Link>
        </Menu.Item>

        <Menu.Item key="user">
          <Link to="/screenuser">
            <Icon type="user" />
            {props.username}
          </Link>
        </Menu.Item>

        <Menu.Item key="app">
          <Link to="/">
            <Icon type="logout" />
            Logout
          </Link>
        </Menu.Item>
      </Menu>
    </nav>
  );
}

function mapStateToProps(state) {
  return { username: state.username };
}

export default connect(mapStateToProps, null)(Nav);
