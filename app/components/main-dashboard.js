import React from 'react'
import { connect } from 'react-redux'
import { getEvent, getGuests, getEvents } from '../reducers/eventReducer'

class MainDashboard extends React.Component {

  componentDidMount() {
    this.props.getEvent(1);
    this.props.getGuests(1);
    this.props.getEvents(this.props.user.id);
  }

  render() {

    const { user, event, guests, events } = this.props
    console.log("EVENTS", events)
    return (
      <div >
        <div >
          <h1>{user.firstName}'s Dashboard. Welcome All!</h1>
        </div>
        <div>
          <h2>Events</h2>
          <h2>{event.title}</h2>
          <ul>
            {events.map(event => {
              return (
                <li key={event.id}>
                  {event.title}
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

  return {
    user: state.user.selectedUser,
    event: state.event.selectedEvent,
    guests: state.event.guests,
    events: state.event.events
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {



  return {
    getEvent(eventId) {

      dispatch(getEvent(eventId));
    },
    getGuests(eventId) {

      dispatch(getGuests(eventId));
    },
    getEvents(userId) {
      dispatch(getEvents(userId))
    }
  }
}



const ConnectedMainDashboard = connect(mapStateToProps, mapDispatchToProps)(MainDashboard)

export default ConnectedMainDashboard;
