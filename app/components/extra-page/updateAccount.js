import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { logout } from '../../reducers/userReducer'

const UpdateAccount = (props) => {
  console.log(props, 'props')
  return (
    <div>
      <form className='login-form' onSubmit={props.handleSubmit}>

        <h2>Account Information</h2>
        <div className='input-field'>
          <label htmlFor='firstName'>First Name</label>
          <input type='text' name='firstName' className='input' defaultValue={props.user.firstName} />
        </div>
        <div className='input-field'>
          <label htmlFor='lastName'>Last Name</label>
          <input type='text' name='lastName' className='input' defaultValue={props.user.lastName} />
        </div>
        <div>
          <button className='submit-button' type='submit'>Update Now</button>
        </div>
      </form >

      <div className='link-open'>
        <Link to='/home'>Back to My Dashboard</Link>
      </div>
      <div>
        <button className='submit-button' type='submit' onClick={props.handleClick}>Logout</button>
      </div>


    </div >


  )




}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.selectedUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  const history = ownProps.history

  return {
    handleClick() {

      dispatch(logout()).then(() => {
        history.push('/');
      })
    }
  }
}

const ConnectedUpdateAccount = connect(mapStateToProps, mapDispatchToProps)(UpdateAccount)

export default ConnectedUpdateAccount;
