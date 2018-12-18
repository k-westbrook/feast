import React from 'react'
import { connect } from 'react-redux'
import { addEvent } from '../../reducers/eventReducer'
import { Link } from 'react-router-dom'




class CreateEvent extends React.Component {


  render() {
    const handleSubmit = this.props.handleSubmit;
    return (
      <div className='create-div'>
        <div>
          <h2 className='create-header'>Create an Event</h2>
        </div>
        <form className='create-form' onSubmit={handleSubmit}>
          <div className='create-field'>
            <label htmlFor='title'>Event Name</label>
            <input type='title' name='title' className='input' />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' className='input' />
          </div>
          <div>
            <button className='submit-button' type='submit'>Create</button>
          </div>
        </form>
        <div className='link-open'>
          <Link to='/home'>Back to My Dashboard</Link>
        </div>
      </div>

    )
  }
}
const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user.selectedUser
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {

  const history = ownProps.history
  console.log(ownProps.id, "STATE");
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const title = evt.target.title.value;
      const password = evt.target.password.value;


      dispatch(addEvent({ title, password })).then(() => {
        history.push('/home');
      })


    }


  }
}
const ConnectedCreateEvent = connect(mapStateToProps, mapDispatchToProps)(CreateEvent)

export default ConnectedCreateEvent


