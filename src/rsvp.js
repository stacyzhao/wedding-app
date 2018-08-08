import React, { Component } from 'react';
import firebase from './firebase.js';
import { Redirect } from 'react-router-dom';
import Input from "./components/Input.js";

class RsvpMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      toRsvpInfo: false
    };

    this.handleSubmit = (event) => {
      const state = this.state;
      event.preventDefault();
      const guestsRef = firebase.database().ref('guests');
      guestsRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          // console.log(state.firstName,state.lastName, childData.firstName, childData.lastName)
          if (state.firstName.toUpperCase() === childData.firstName && state.lastName.toUpperCase() === childData.lastName) {
            this.setState({toRsvpInfo: true});
            console.log(state.firstName);
          };

        });
      });
    };

    this.update = (event) => {
      const newState = {};
      newState[event.target.name] = event.target.value;
      this.setState(newState);
    };
  }

  render() {
    if (this.state.toRsvpInfo === true) {
      return <Redirect to='/rsvpinfo' />
    }

    return (
      <div className="hero-text">
        <h2>RSVP</h2>
        <h4>We hope you can join us!</h4>
        <h5>Enter your info below:</h5>
        <div>
          <form onSubmit={this.handleSubmit}>
            <Input
              inputtype={"text"}
              title={"First Name"}
              name={"firstName"}
              value={this.state.firstName}
              placeholder={"Enter your first name"}
              onChange={this.update}
              required
              />{" "}
              <Input
                inputtype={"text"}
                title={"Last Name"}
                name={"lastName"}
                value={this.state.lastName}
                placeholder={"Enter your last name"}
                onChange={this.update}
                required
                />{" "}
            <input type="submit" value="Next" onSubmit={this.handleSubmit} />
          </form>
        </div>
      </div>
    );
  }
}

export default RsvpMain;
