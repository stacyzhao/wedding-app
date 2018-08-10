import React from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

const NavBar = () => (
  <Navbar>
    <div className="hero-text">
      <Nav pullRight>
        <NavItem eventKey={1} href='/' className='active'>
          Home
        </NavItem>
        <NavItem eventKey={2} href='/venue'>
          Venue
        </NavItem>
        <NavItem eventKey={3} href='/menu'>
          Menu
        </NavItem>
        <NavItem eventKey={4} href='/rsvpmain'>
          RSVP
        </NavItem>
        <NavItem eventKey={4} href='/registry'>
          Registry
        </NavItem>
      </Nav>
    </div>
  </Navbar>
)

export default NavBar;
