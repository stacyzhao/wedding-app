import React, { Component } from 'react';
import firebase from './firebase.js';
import Button from './components/Button.js'
import Select from './components/Select.js'
import Input from './components/Input.js'

const validate = (firstName, lastName, isGoing, entree, starter) => {
  const errors = [];
  if (firstName.length === 0) {
    errors.push("First Name can't be empty");
  } else if (lastName.length === 0) {
    errors.push("Last Name can't be empty");
  } else if (isGoing === '') {
    errors.push("You havent decided if youre coming yet");
  } else if (isGoing === 'Will Attend' && (starter === '' || entree === '')) {
    errors.push("Pick a starter and entree please");
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
      isGoingOptions: ['Will Attend', 'Will Not Attend'],
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

      const errors = validate(guest.firstName, guest.lastName, guest.isGoing);
      if (errors.length > 0) {
        this.setState({ errors });
        return;
      }

      guestsRef.on('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          console.log('out')
        })
      })

      const key = guestsRef.push().key;
      guest[key] = {
        isGoing: state.isGoing
      }
      var result = guestsRef.update(guest);
      console.log(result)
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
      entree: '',
    });
  }

  rsvpDisable() {
    return this.state.isGoing === 'Will Not Attend' || this.state.isGoing === '';
  }

  render() {
    const { errors, isGoing, firstName, lastName, isGoingOptions, starterOptions, entreeOptions } = this.state;
    if (this.state.toCompletePage === true) {
      return <div className='hero-text'><h2>your info has been sent</h2>
        <h3>Thanks</h3>
        <h4><a href='/rsvpmain'>Add More Guest</a></h4></div>
    }
    return (
      <div className='hero-text'>
        <h2>RSVP</h2>
        <h5>We hope you can join us!</h5>
        <p>Please complete this form for each seat</p>
        <div className="div-container">
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
                options={isGoingOptions}
                value={isGoing}
                placeholder={''}
                handleChange={this.update}
                required
              />
              <fieldset disabled={this.rsvpDisable()}>
                <Select
                  title={'Starter'}
                  name={'starter'}
                  options={starterOptions}
                  value={this.state.starter}
                  placeholder={'Select Starter'}
                  handleChange={this.update}
                />
                <Select
                  title={'Entree'}
                  name={'entree'}
                  options={entreeOptions}
                  value={this.state.entree}
                  placeholder={'Select Entree'}
                  handleChange={this.update}
                />
              </fieldset>
            </div>
            <Button
              action={this.handleSubmit}
              type={'primary'}
              title={'SUBMIT'}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default RsvpInfo;
