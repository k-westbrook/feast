import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'
import { logout } from '../../reducers/userReducer'

class MyAccount extends React.Component {



  render(props) {

    return (
      <div>
        <h2>Account Information</h2>
        <div>
          <p>Name:{this.props.user.firstName} {this.props.user.lastName} </p>
          <p>Email: {this.props.user.email}</p>
        </div>
        <div className='link-open'>
          <Link to='/home'>Back to My Dashboard</Link>
        </div>
        <div>
          <button className='submit-button' type='submit' onClick={this.props.handleClick}>Logout</button>
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

  const history = ownProps.history

  return {
    handleClick() {

      dispatch(logout()).then(() => {
        history.push('/');
      })
    }
  }
}

const ConnectedMyAccount = connect(mapStateToProps, mapDispatchToProps)(MyAccount)

export default ConnectedMyAccount;
