import React, { Component } from 'react';
import firebase from './firebase.js';
import { Redirect, Link } from 'react-router-dom';
import Button from './components/Button.js'
import Select from './components/Select.js'
import Input from './components/Input.js'
import Rsvp from './rsvp.js'

function validate(firstName, lastName, isGoing, entree, starter) {
  const errors = [];

  if (firstName.length === 0) {
    errors.push("First Name can't be empty");
  } else if (lastName.length === 0) {
    errors.push("Last Name can't be empty");
  } else if (isGoing === '') {
    errors.push("You havent decided if youre coming yet");
  }

  return errors;
}

class RsvpInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      starter: '',
      entree: '',
      isGoing: '',
      moreGuests: [],
      isGoingOptions: ['Accept', 'Regret'],
      starterOptions: ['Caprese Salad','Cured Salmon'],
      entreeOptions: ['Duck Breast', 'Steak Frites', 'Wild Mushroom Gnocchi'],
      toCompletePage: false,
      errors : [],
    };
    this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = (event) => {
      event.preventDefault();
      const state = this.state;
      const guestsRef = firebase.database().ref('guests');
      const guest = {
        firstName: state.firstName.toUpperCase(),
        lastName: state.lastName.toUpperCase(),
        isGoing: state.isGoing,
        starter: state.starter,
        entree: state.entree
      }
      const { firstName, lastName, isGoing } = this.state;

      const errors = validate(firstName, lastName, isGoing);
      if (errors.length > 0) {
        this.setState({ errors });
        return;
      }
      guestsRef.push(guest);

      this.setState({
        firstName: '',
        lastName: '',
        isGoing: '',
        starter: '',
        entree: '',
        toCompletePage: true
      })
    };

    this.update = (event) => {
      this.setState({[event.target.name]: event.target.value});
    };
  }

  handleChange(e) {
    this.setState({
      isGoing: e.target.value,
      starter: '',
      entree: ''
    });
  }

  isDisabled() {
    return this.state.isGoing === 'Regret' || this.state.isGoing === '';
  }

  render() {

    const { errors, isGoing, firstName, lastName, isGoingOptions, starterOptions, entreeOptions } = this.state;
    if (this.state.toCompletePage === true) {
      return <div className='hero-text'><h2>your info has been sent. Thanks</h2><h4><Link to='/rsvpmain' > Click here to add more guests</Link></h4></div>
    }
    return (
      <div className='hero-text'>
        <h2>RSVP</h2>
        <h4>We hope you can join us!</h4>
        <h5>Enter your info below:</h5>
        <div>
          <p></p>
          <form onSubmit={this.handleSubmit}>
            {errors.map(error => (
              <p className='error' key={error}>Error: {error}</p>
            ))}
            <div className='div-form'>
              <Input
                inputtype={'text'}
                title={'First Name'}
                name={'firstName'}
                value={firstName}
                placeholder={''}
                onChange={this.update}
                required
              />
              <Input
                inputtype={'text'}
                title={'Last Name'}
                name={'lastName'}
                value={lastName}
                placeholder={''}
                onChange={this.update}
                required
              />
              <Select
                title={'Will you be able to attend the wedding on Sunday, Sept 23, 2018?'}
                name={'isGoing'}
                options={this.state.isGoingOptions}
                value={isGoing}
                placeholder={''}
                handleChange={this.update}
                required
              />
              <fieldset disabled={this.isDisabled()}>
                <Select
                  title={'Starter'}
                  name={'starter'}
                  options={starterOptions}
                  value={this.state.starter}
                  placeholder={'Select Starter'}
                  handleChange={this.update}
                  disabled={this.isDisabled()}
                />
                <Select
                  title={'Entree'}
                  name={'entree'}
                  options={entreeOptions}
                  value={this.state.entree}
                  placeholder={'Select Entree'}
                  handleChange={this.update}
                  disabled={this.isDisabled()}
                />
              </fieldset>
            </div>
            <Button
              action={this.handleSubmit}
              type={'primary'}
              title={'Submit'}
              disabled={!this.state.firstName}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default RsvpInfo;
