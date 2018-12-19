import React from 'react'
import { connect } from 'react-redux'
import { getEvent, getGuests } from '../../reducers/eventReducer'
import { Link } from 'react-router-dom'
import GuestItem from './guestItem'

class SingleEventView extends React.Component {

  constructor() {
    super();
    this.state = {
      load: false
    }
  }

  componentDidMount() {

    this.props.getEvent(this.props.match.params.eventId);
    this.props.getGuests(this.props.match.params.eventId);
    this.setState({ load: true });
  }
  render() {

    return (
      <div>
        {(this.state.load) ?
          <div>
            <h1>{this.props.event.title}</h1>
            <h2>Guests Attending</h2>
            <ul>
              {this.props.guests.map(guest => {
                return <GuestItem guest={guest} key={guest.id} />
              })}
            </ul>

            <div>
              <Link to={{ pathname: `/event/addGuest`, query: { id: event.id } }} key={event.id} >
                <h3>Add a Guest</h3>
              </Link>
            </div>
          </div>
          :
          <h2>loading</h2>
        }

        <div className='link-open'>
          <Link to='/home'>Back to My Dashboard</Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

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
    },
    getMe() {

      dispatch(getMe());
    }
  }
}

const ConnectedSingleEventView = connect(mapStateToProps, mapDispatchToProps)(SingleEventView)

export default ConnectedSingleEventView;
