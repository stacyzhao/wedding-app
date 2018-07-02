import React, { Component } from 'react';
import './App.css';
// import NavBar from "./NavBar";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <NavBar />
            <p>hi</p>
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/venue" component={Venue} />
          <Route path="/menu" component={Menu} />
          <Route path="/rsvp" component={Rsvp} />
        </div>
      </Router>
    );
  }
}

const NavBar = () =>(
    <Navbar>
      <div>
        <Nav pullRight>
          <NavItem eventKey={1} href="/">
            Home
          </NavItem>
          <NavItem eventKey={2} href="/venue">
            Venue
          </NavItem>
          <NavItem eventKey={3} href="/menu">
            Menu
          </NavItem>
          <NavItem eventKey={4} href="/rsvp">
            RSVP
          </NavItem>
        </Nav>
      </div>
    </Navbar>
)
const Home = () => (
  <div className="hero-text">
    <h2>Brendan & Stacy</h2>
    <h4>Sept 23, 2018</h4>
  </div>
);

const Venue = () => (
  <div className="hero-text">
    <h2>Venue</h2>
    <h4>Our wedding dinner party will be held at Peter Pan Bistro at 6 PM</h4>
  </div>
);

const Menu = () => (
  <div className="hero-text">
    <h2>Menu</h2>
    <h4>TO START |</h4>
    <p> CURED SALMON – potato latke, crème fraiche, pickled vegetables, new farm greens</p>
    <p> CAPRESE SALAD – heirloom tomatoes, burrata, basil pesto, ramps</p>

    <h4>MAIN |</h4>

    <p>DUCK BREAST – beets, farro, confit shallot, pickled walnut sauce</p>
    <p>STEAK FRITES – creamed spinach, wild mushroom, fries, veal jus *</p>
    <p>WILD MUSHROOM GNOCCHI – Jerusalem artichoke, parmesan, truffle</p>

    <p>Dessert table to follow.</p>
  </div>
);

const Rsvp = () => (
<div className="hero-text">
    <h2>RSVP</h2>
  </div>
);


export default App;
