import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Dashboard = (props) => {
  const { user, handleClick } = props

  if (!user.id) {
    return <Redirect to='/' />
  }
  return (
    <div >
      <div >
        <h1>Welcome back, {user.firstName}!</h1>
      </div>
      <div>
        <button type='submit' onClick={handleClick}>Logout</button>
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
    }
  }
}

const ConnectedDashboard = connect(mapStateToProps, mapDispatchToProps)(Dashboard)

export default ConnectedDashboard;
