import React, { Component, PropTypes } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends Component {
    static contextTypes = {
        location: PropTypes.object,
        history: PropTypes.object
    };
    render () {
        let { user, userLogout } = this.props;
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to="/">
                            <a href="/">Samplr Admin</a>
                        </LinkContainer>
                    </Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <LinkContainer to="/groups">
                            <NavItem>
                                Groups
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to="/users">
                            <NavItem>
                                Users
                            </NavItem>
                        </LinkContainer>
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
