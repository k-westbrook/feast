import React from 'react'
import { connect } from 'react-redux'
import { getEvent, getGuests, getEvents } from '../reducers/eventReducer'
import { getItemsForUser } from '../reducers/userReducer'
import EventList from './dash-events/event-list.js'
import { Link } from 'react-router-dom'
import UserItemList from './dash-events/UserItemList'


class MainDashboard extends React.Component {

  constructor() {
    super();
    this.state = {
      load: false
    }
  }
  componentDidMount() {

    this.props.getEvents(this.props.user.id);
    this.props.getItemsForUser(this.props.user.id)
    this.setState({ load: true })
  }

  render() {

    const { user, events, items } = this.props

    return (
      <div >
        {this.state.load ?
          <div>
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
                <div>
                  <h2>What you are bringing</h2>
                  {(items.length > 0) ?
                    <UserItemList items={items} />
                    :
                    <div>
                      <h3>No Items Yet</h3>
                    </div>
                  }
                </div>
                <Link to='/createEvent'>Create Event Now</Link>
              </div>
            </div>
          </div>
          :
          <div>
            <h2>loading</h2>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user.selectedUser,
    event: state.event.selectedEvent,
    guests: state.event.guests,
    events: state.event.events,
    items: state.user.items
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
    },
    getItemsForUser(userId) {
      dispatch(getItemsForUser(userId))
    }
  }
}



const ConnectedMainDashboard = connect(mapStateToProps, mapDispatchToProps)(MainDashboard)

export default ConnectedMainDashboard;
