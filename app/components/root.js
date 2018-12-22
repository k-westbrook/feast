import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { ConnectedLoginForm } from './login-page'
import ConnectedDashboard from './dashboard'
import ConnectedSignUpForm from './signup-page'
import ConnectedCreateEvent from './create-events/create-event.js'
import ConnectedSingleEventView from './dash-events/singleEvent';
import ConnecteAddGuest from './dash-events/addGuest'
import ConnecteAddItem from './dash-events/addItem'
import NotFound from './extra-page/notFound';


const Root = () => {




  return (
    <div>
      <nav>
        <div className='nav-name'>
          Feast
        </div>
      </nav>
      <Router>
        <Switch>
          <main>
            <Route exact path='/' component={ConnectedLoginForm} />
            <Route exact path='/home' component={ConnectedDashboard} />
            <Route exact path='/signup' component={ConnectedSignUpForm} />
            <Route exact path='/createEvent' render={(routeProps) => <ConnectedCreateEvent {...routeProps} />} />
            <Route exact path='/event/:eventId' render={(routeProps) => <ConnectedSingleEventView {...routeProps} />} />
            <Route exact path='/event/addGuest/:eventId' render={(routeProps) => <ConnecteAddGuest {...routeProps} />} />
            <Route exact path='/event/addItem/:eventId' render={(routeProps) => <ConnecteAddItem {...routeProps} />} />

          </main>
        </Switch>
      </Router>
    </div>
  )

}



export default Root
