import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import ConnectedMainDashboard from './main-dashboard'
import ConnectedCreateEvent from './create-events/create-event.js'

const Dashboard = (props) => {
  const { user, handleClick } = props

  if (!user.id) {
    return <Redirect to='/' />
  }
  return (
    <div >
      <Router>
        <Switch>
          <main>
            <Route path='/home' component={ConnectedMainDashboard} />
            <Route path='/createEvent' component={ConnectedCreateEvent} />
          </main>
        </Switch>
      </Router>
      <div>
        <button className='submit-button' type='submit' onClick={handleClick}>Logout</button>
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
