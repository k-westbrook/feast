import React from 'react'
import { connect } from 'react-redux'
import { addUser, getMe } from '../reducers/userReducer'
import { Link, Redirect } from 'react-router-dom'



class SignUpForm extends React.Component {

  render() {
    this.props.getMe();

    return (
      <div className='log-div'>
        <h2 className='login-name'> Feast</h2>
        <h2 className='login-header'>Sign up!!</h2>
        <div>

          <form className='login-form' onSubmit={this.props.handleSubmit}>
            <div>
              <div className='input-field'>
                <label htmlFor='firstName'>First Name</label>
                <input type='firstName' name='firstName' className='input' />
              </div>
              <div className='input-field'>
                <label htmlFor='lastName'>Last Name</label>
                <input type='lastName' name='lastName' className='input' />
              </div>
              <div className='input-field'>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' className='input' />
              </div>
              <div className='input-field'>
                <label htmlFor='email'>Password</label>
                <input type='password' name='password' className='input' />
              </div>
              <div >
                <button className='submit-button' type='submit'>Sign Up</button>
              </div>
            </div>
          </form>
          <div className='link-open'>
            <Link to='/'>Already a member? Login</Link>
          </div>
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
  // Hey, check it out! Because we pass the connected Login to a Route
  // (we do this in client/index.js), it receives the "route props"
  // (match, location, and history) as its "own props".
  const history = ownProps.history

  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      const firstName = evt.target.firstName.value;
      const lastName = evt.target.lastName.value;


      dispatch(addUser({ firstName, lastName, email, password })).then(() => {
        history.push('/home');
      })


    },

    getMe() {

      dispatch(getMe()).then(() => {
        history.push('/home');
      })

    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)
