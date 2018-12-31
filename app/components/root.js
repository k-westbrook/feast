import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ConnectedLoginForm } from './login-page'
import ConnectedDashboard from './dashboard'
import ConnectedSignUpForm from './signup-page'
import ConnectedCreateEvent from './create-events/create-event.js'
import ConnectedSingleEventView from './dash-events/singleEvent';
import ConnecteAddGuest from './dash-events/addGuest'
import ConnecteAddItem from './dash-events/addItem'
import NotFound from './extra-page/notFound';
import ConnectedMyAccount from './extra-page/myAccount';
import ConnectedUpdateAccount from './extra-page/updateAccount'

const Root = (props) => {


  const { user } = props;


  return (
    <div>
      <Router>
        <div>
          <nav>
            <div className='nav-name'>
              Feast
        </div>
            {(user.id) ?
              <div className='nav-box'>
                <div className='nav-link'>
                  <Link to='/home'>My Dashboard</Link>
                </div>
                <div className='nav-link'>
                  <Link to='/myAccount'>My Account</Link>
                </div>
              </div>
              :
              <div className='nav-link'>
                <Link to='/signup'>Sign up</Link>
              </div>
            }

          </nav>
          <Switch>
            <main>
              <Route exact path='/' component={ConnectedLoginForm} />
              <Route exact path='/home' component={ConnectedDashboard} />
              <Route exact path='/myAccount' render={(routeProps) => <ConnectedMyAccount {...routeProps} />} />
              <Route exact path='/updateAccount' render={(routeProps) => <ConnectedUpdateAccount {...routeProps} />} />
              <Route exact path='/signup' component={ConnectedSignUpForm} />
              <Route exact path='/createEvent' render={(routeProps) => <ConnectedCreateEvent {...routeProps} />} />
              {/* <Route exact path='/event/:eventId' render={(routeProps) => <ConnectedSingleEventView {...routeProps} />} />
              <Route exact path='/event/addGuest/:eventId' render={(routeProps) => <ConnecteAddGuest {...routeProps} />} />
              <Route exact path='/event/addItem/:eventId' render={(routeProps) => <ConnecteAddItem {...routeProps} />} /> */}

            </main>
          </Switch>
        </div>
      </Router>
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

const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root)

export default ConnectedRoot;



