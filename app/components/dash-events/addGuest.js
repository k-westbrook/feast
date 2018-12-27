import React from 'react'
import { connect } from 'react-redux'
import { addGuest } from '../../reducers/eventReducer'
import { getMe } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'




const AddGuest = (props) => {

  const handleSubmit = props.handleSubmit;
  return (

    <div className='create-div'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <div className='input-field'>
            <label htmlFor='firstName'>First Name</label>
            <input type='firstName' name='firstName' className='input' />
          </div>
          <div className='input-field'>
            <label htmlFor='lastName'>Last Name</label>
            <input type='lastName' name='lastName' className='input' />
          </div>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' className='input' />
          </div>
          <button className='submit-button' type='submit'>Sign Up</button>
        </div>

      </form>
      <div className='link-open'>
        <Link to={{ pathname: `/event/${props.event}` }}>Back to Event</Link>
      </div>
    </div>

  )


}

const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user.selectedUser,
    event: state.event.selectedEvent,
    guests: state.event.guests
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  const history = ownProps.history;

  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log('hi')
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;
      const email = evt.target.email.value;
      const eventId = ownProps.match.params.eventId;

      dispatch(addGuest({ firstName, lastName, email }, eventId)).then(() => {
        history.push(`/event/${eventId}`);
      })


    },
    getMe() {

      dispatch(getMe());
    }


  }
}

const ConnectedAddGuest = connect(mapStateToProps, mapDispatchToProps)(AddGuest)

export default ConnectedAddGuest

