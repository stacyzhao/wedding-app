import React, { Component } from 'react';
import './App.css';
import NavBar from "./components/NavBar";
import RsvpInfo from "./rsvpinfo";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PeterPanBistro from './images/peterpan.jpg';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div>
            <NavBar />
          </div>
          <Route exact path="/" component={Home} />
          <Route path="/venue" component={Venue} />
          <Route path="/menu" component={Menu} />
          <Route path="/rsvpmain" component={RsvpInfo} />
          <Route path="/registry" component={Registry} />
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div className="hero-text">
    <h2 className="h-spacing">Brendan & Stacy</h2>
    <h4>September 23, 2018</h4>
    <h5>Toronto</h5>
  </div>
);

const Venue = () => (
  <div className="hero-text">

    <div className="PeterPanBistro">

      <img src={PeterPanBistro} alt="Peter Pan Bistro"/>
    </div>
    <h2 className="h-spacing">Location</h2>
    <h4>Peter Pan Bistro</h4>
    <h5>373 Queen St W, Toronto, Ontario</h5>
    <h6>Mingling at 6PM Dinner at 7PM</h6>
  </div>
);

const Menu = () => (
  <div className="hero-text">
    <h2 className="h-spacing">Menu</h2>
    <div className="h-spacing">
      <h5>TO START |</h5>
      <p> CURED SALMON – potato latke, crème fraiche, pickled vegetables, new farm greens</p>
      <p> CAPRESE SALAD – heirloom tomatoes, burrata, basil pesto, ramps</p>
    </div>
    <div className="h-spacing">
      <h5>MAIN |</h5>
      <p>DUCK BREAST – beets, farro, confit shallot, pickled walnut sauce</p>
      <p>STEAK FRITES – creamed spinach, wild mushroom, fries, veal jus *</p>
      <p>WILD MUSHROOM GNOCCHI – Jerusalem artichoke, parmesan, truffle</p>
      <p>For the kids: Chicken Nuggets and Fries</p>
    </div>
    <div>
      <p className="h-spacing">Dessert table to follow.</p>
    </div>
  </div>
);

const Registry = () => (
  <div className="hero-text">
    <h2 className="h-spacing">Registry</h2>
    <p className="h-spacing small-container">
      We are lucky enough to have everything we need for this next exciting chapter of our lives! So please, no gifts – your presence is present enough for us on this special day
    </p>
    <p className="h-spacing">
      For those who are persistent:
      <a href="https://www.macys.com/wgl/registry/guest/6965090">Macy's</a>,
      <a href="https://www.amazon.com/wedding/share/bracy">Amazon</a>
    </p>
  </div>
);

export default App;
