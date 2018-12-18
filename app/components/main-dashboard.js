import React from 'react'
import { connect } from 'react-redux'
import { getEvent, getGuests, getEvents } from '../reducers/eventReducer'
import EventList from './dash-events/event-list.js'
import { Link } from 'react-router-dom'

class MainDashboard extends React.Component {

  componentDidMount() {
    // this.props.getEvent(1);
    // this.props.getGuests(1);
    this.props.getEvents(this.props.user.id);
  }

  render() {

    const { user, events } = this.props

    return (
      <div >
        <div >
          <h1>{user.firstName}'s Dashboard. Welcome All!</h1>
        </div>
        <div>
          <h2>Events</h2>
          {(events.length > 0) ?
            <EventList events={events} />
            :
            <div>
              <h3>No Events Yet</h3>
            </div>
          }
          <div>
            <Link to='/createEvent'>Create Event Now</Link>
          </div>
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
