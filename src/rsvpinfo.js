import React, { Component } from 'react';
import firebase from './firebase.js';

class RsvpInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      starter: '',
      entree: '',
      starterOptions: ['caprese','salmon'],
      entreeOptions: ['duck', 'steak', 'gnocchi']
    },

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
        entree: ''
      });
      alert('Thanks!');
    };

    this.update = (event) => {
      const newState = {};
      newState[event.target.name] = event.target.value;
      this.setState(newState);
    };
  }

  render() {
    return (
      <div className="hero-text">
        <h2>RSVP</h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>
                Will you be able to attend the wedding on Sunday, Sept 23, 2018?
              </div>
              <div className='div-form'>
              <select name="isGoing" onChange={this.update} value={this.state.isGoing} required>
                <option value="true">Accept</option>
                <option value="false">Regret</option>
              </select>
              </div>
              <div className='div-form'>
                <select name="starter" onChange={this.update} value={this.state.starter}>
                  <option value="salmon">Cured Salmon</option>
                  <option value="caprese">Caprese Salad</option>
                </select>
                <select name="entree" onChange={this.update} value={this.state.entree}>
                  <option value="duck">Duck</option>
                  <option value="steak">Steak</option>
                  <option value="gnocchi">Gnocchi</option>
                </select>
              </div>
            </label>
            <br />
            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    );
  }
}

export default RsvpInfo;
