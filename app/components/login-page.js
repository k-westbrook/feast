import React from 'react'
import { connect } from 'react-redux'
import { login, getMe } from '../reducers/userReducer'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import ConnectedSignUpForm from './signup-page'

class LoginForm extends React.Component {

  componentDidMount() {
    this.props.getMe();


  }



  render() {
    const handleSubmit = this.props.handleSubmit;
    return (
      <div className='log-div'>
        <h2 className='login-name'> Feast</h2>
        <div>
          <h2 className='login-header'>Login Page</h2>
        </div>
        <form className='login-form' onSubmit={handleSubmit}>
          <div className='input-field'>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' className='input' />
          </div>
          <div className='input-field'>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' className='input' />
          </div>
          <div>
            <button className='submit-button' type='submit'>Login</button>
          </div>
        </form>
        <div className='link-open'>
          <Link to='/signup'>Don't have an account? Sign up today!</Link>
          <Route path='/signup' component={ConnectedSignUpForm} />
        </div>
      </div >

    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const history = ownProps.history
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value;
      const password = evt.target.password.value;

      dispatch(login({ email, password })).then((result) => {

        if (result) {
          alert('Wrong password or email')
        } else {
          history.push('/home');
        }
      })


    },
    getMe() {

      dispatch(getMe()).then(() => {
        history.push('/home');
      })


    }

  }
}
const ConnectedLoginForm = connect(null, mapDispatchToProps)(LoginForm)

export { ConnectedLoginForm }
