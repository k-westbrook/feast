import React from 'react'
import { connect } from 'react-redux'
import { getEvent, getGuests } from '../reducers/eventReducer'

class MainDashboard extends React.Component {

  componentDidMount() {
    this.props.getEvent(1);
    this.props.getGuests(1);
  }

  render() {

    const { user, event, guests } = this.props
    console.log('hello', guests)
    return (
      <div >
        <div >
          <h1>{user.firstName}'s Dashboard</h1>
        </div>
        <div>
          <h2>Events</h2>
          <h2>{event.title}</h2>
          <ul>
            {guests.map(guest => {
              return (
                <li key={guest.id}>
                  {guest.firstName} {guest.lastName}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  console.log(state.event)
  return {
    user: state.user.selectedUser,
    event: state.event.selectedEvent,
    guests: state.event.guests
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {



  return {
    getEvent(eventId) {

      dispatch(getEvent(eventId));
    },
    getGuests(eventId) {

      dispatch(getGuests(eventId));
    }
  }
}



const ConnectedMainDashboard = connect(mapStateToProps, mapDispatchToProps)(MainDashboard)

export default ConnectedMainDashboard;
