import React, { Component, propTypes } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {
    render () {
        let { user, userLogout } = this.props;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                      <a href="/">Samplr Admin</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="/">Dashboard</NavItem>
                        <NavItem eventKey={2} href="/users">Users</NavItem>
                    </Nav>
                    <Nav pullRight>
                        <Navbar.Text>
                            Logged in as <b>{user.email}</b>
                        </Navbar.Text>
                        <NavItem onClick={userLogout.bind(null)} href="/">
                            <b>Logout</b>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
