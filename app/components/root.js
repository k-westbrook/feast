import React from 'react'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { ConnectedLoginForm } from './login-page'
import ConnectedDashboard from './dashboard'
import ConnectedSignUpForm from './signup-page'



class Root extends React.Component {



  render() {
    return (
      <div>
        <nav>
          Feast
      </nav>
        <Router>
          <Switch>
            <main>
              <Route exact path='/' component={ConnectedLoginForm} />
              <Route path='/home' component={ConnectedDashboard} />
              <Route path='/signup' component={ConnectedSignUpForm} />
            </main>
          </Switch>
        </Router>
      </div>
    )
  }
}



export default Root
