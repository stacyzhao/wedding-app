import React, { Component } from 'react';
import firebase from './firebase.js';
import { Redirect } from 'react-router-dom';
import Button from './components/Button.js'
import Select from './components/Select.js'

class RsvpInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starter: '',
      entree: '',
      isGoing: '',
      isGoingOptions: ['Accept', 'Regret'],
      starterOptions: ['Caprese','Salmon'],
      entreeOptions: ['Duck', 'Steak', 'Gnocchi'],
      toCompletePage: false,
      toMenuSelection: false
    };
    this.handleChange = this.handleChange.bind(this);


    this.handleSubmit = (event) => {
      const state = this.state;
      event.preventDefault();
      const guestsRef = firebase.database().ref('guests');
      const guest = {
        isGoing: state.isGoing,
        starter: state.starter,
        entree: state.entree
      }
      guestsRef.push(guest);
      this.setState({
        isGoing: '',
        starter: '',
        entree: '',
        toCompletePage: true
      });
    };

    this.update = (event) => {
      const newState = {};
      newState[event.target.name] = event.target.value;
      this.setState(newState);
    };
  }
  handleChange(e) {
      this.setState({ isGoing: e.target.value , starter: '',
      entree: ''});
    }

  render() {
    const { isGoing } = this.state;
    if (this.state.toCompletePage === true) {
      return <div className="hero-text"><h2>your info has been sent. Thanks</h2></div>
    }
    return (
      <div className="hero-text">
        <h2>RSVP</h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div className='div-form'>
                <Select
                  title={"Will you be able to attend the wedding on Sunday, Sept 23, 2018?"}
                  name={"isGoing"}
                  options={this.state.isGoingOptions}
                  value={isGoing}
                  placeholder={""}
                  handleChange={this.update}
                  required
                />{" "}
                <Select
                  title={"Starter"}
                  name={"starter"}
                  options={this.state.starterOptions}
                  value={this.state.starter}
                  placeholder={"Select Starter"}
                  handleChange={this.update}
                  disabled={isGoing === 'Regret'}
                />{" "}
                <Select
                  title={"Entree"}
                  name={"entree"}
                  options={this.state.entreeOptions}
                  value={this.state.entree}
                  placeholder={"Select Entree"}
                  handleChange={this.update}
                  disabled={isGoing === 'Regret'}
                />{" "}
              </div>
            </label>
            <Button
              action={this.handleSubmit}
              type={"primary"}
              title={"Submit"}
            />{" "}
          </form>
        </div>
      </div>
    );
  }
}

export default RsvpInfo;
