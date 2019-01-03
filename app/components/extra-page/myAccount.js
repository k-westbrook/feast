import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { logout, deleteUser } from '../../reducers/userReducer'

const MyAccount = (props) => {

  return (
    <div className='main-dashboard'>
      <h2>Account Information</h2>
      <div>
        <p>Name:{props.user.firstName} {props.user.lastName} </p>
        <p>Email: {props.user.email}</p>
        <img className='profile-pic' src={props.user.photo} />
      </div>
      <div className='link-open'>
        <Link to='/updateAccount'>Update My Account</Link>
      </div>
      <div className='link-open'>
        <Link to='/home'>Back to My Dashboard</Link>
      </div>
      <div>
        <div>
          <button className='submit-button' type='submit' onClick={props.deleteUser}>Delete Account</button>
          <p className='blurb'>If you delete your account, then you will be removed from any events. If you are the sole admin for any events, those events will be deleted as well.</p>
        </div>
        <button className='submit-button' type='submit' onClick={props.handleClick}>Logout</button>
      </div>
    </div>


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
    },
    deleteUser() {
      dispatch(deleteUser()).then(() => {
        history.push('/')
      })
    }
  }
}

const ConnectedMyAccount = connect(mapStateToProps, mapDispatchToProps)(MyAccount)

export default ConnectedMyAccount;
