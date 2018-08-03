import React, { Component } from 'react';
import firebase from './firebase.js';
import { Link, Redirect } from 'react-router-dom';

class RsvpMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      isTrue: false
    }

    this.handleSubmit = (event) => {
      const state = this.state;
      event.preventDefault();
      const guestsRef = firebase.database().ref('guests');
      guestsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var childData = childSnapshot.val();
          // console.log(state.firstName,state.lastName, childData.firstName, childData.lastName)
          if (state.firstName.toUpperCase() === childData.firstName && state.lastName.toUpperCase() === childData.lastName) {
            console.log('in');
          };
          console.log('out');
        });
      });
      // // alert('name: '+ state.firstName + ' age: ' + state.lastName);
    };

    this.update = (event) => {
      const newState = {};
      newState[event.target.name] = event.target.value;
      this.setState(newState);
    };
  }

  render() {

    if (this.state.isTrue === true) {
      return <Redirect to='/rsvpinfo' />
    }
    return (
      <div className="hero-text">
        <h2>RSVP</h2>
        <h4>We hope you can join us!</h4>
        <h5>Enter your info below:</h5>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="firstName" placeholder="First Name" onChange={this.update} value={this.state.firstName} required/>
            <br />
            <input type="text" name="lastName" placeholder="Last Name" onChange={this.update} value={this.state.lastName} required/>
            <br />
            <input type="submit" value="Next" onSubmit={this.handleSubmit} />
          </form>
        </div>
      </div>
    );
  }
}

export default RsvpMain;
