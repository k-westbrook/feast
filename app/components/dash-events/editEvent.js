import React from 'react'
import { connect } from 'react-redux'
import { updateEvent } from '../../reducers/eventReducer'
import { getMe } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'




const EditEvent = (props) => {

  const event = props.location.query.event;


  const handleSubmit = props.handleSubmit;
  return (
    <div className='create-div'>
      <div>
        <h2 className='create-header'>Create an Event</h2>
      </div>
      <form className='create-form' onSubmit={handleSubmit}>
        <div className='create-field'>
          <label htmlFor='title'>Event Name</label>
          <input type='title' name='title' className='input' defaultValue={event.title} />
        </div>
        <div className='input-field'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' className='input' defaultValue={event.password} />
        </div>
        <div>
          <button className='submit-button' type='submit'>Update</button>
        </div>
      </form>
      <div className='link-open'>
        <Link to='/home'>Back to My Dashboard</Link>
      </div>
    </div>

  )

}
const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user.selectedUser,
    event: state.event.selectedEvent
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {

  const history = ownProps.history;

  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const title = evt.target.title.value;
      const password = evt.target.password.value;

      dispatch(updateEvent({ title, password }, ownProps.match.params.eventId)).then(() => {
        history.push(`/event/${ownProps.match.params.eventId}`);
      })


    }

  }
}


const ConnectedEditEvent = connect(mapStateToProps, mapDispatchToProps)(EditEvent)

export default ConnectedEditEvent
