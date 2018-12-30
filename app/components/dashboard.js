import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import ConnectedMainDashboard from './main-dashboard'
import ConnectedCreateEvent from './create-events/create-event.js'
import ConnectedSingleEventView from './dash-events/singleEvent';
import ConnecteAddGuest from './dash-events/addGuest'
import ConnecteAddItem from './dash-events/addItem'
import ConnectedUpdateItem from './dash-events/updateItem'
import ConnectedEditEvent from './dash-events/editEvent'

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
            <Route path='/home' render={(routeProps) => <ConnectedMainDashboard {...routeProps} />} />
            <Route path='/createEvent' render={(routeProps) => <ConnectedCreateEvent {...routeProps} />} />
            <Route exact path='/event/:eventId' render={(routeProps) => <ConnectedSingleEventView {...routeProps} />} />
            <Route path='/event/addGuest/:eventId' render={(routeProps) => <ConnecteAddGuest {...routeProps} />} />
            <Route path='/event/addItem/:eventId' render={(routeProps) => <ConnecteAddItem {...routeProps} />} />
            <Route path='/event/updateItem/:eventId/:itemId' render={(routeProps) => <ConnectedUpdateItem {...routeProps} />} />
            <Route path='/event/editEvent/:eventId/' render={(routeProps) => <ConnectedEditEvent {...routeProps} />} />
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
