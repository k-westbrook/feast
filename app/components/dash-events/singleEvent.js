import React from 'react'
import { connect } from 'react-redux'
import { getEvent, getGuests, getItems } from '../../reducers/eventReducer'
import { Link } from 'react-router-dom'
import GuestItem from './guestItem'
import BroughtItem from './BroughtItem'

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
    this.props.getItems(this.props.match.params.eventId)
    this.setState({ load: true });
  }
  render() {
    console.log('THE PROPS', this.props.items[0])
    return (
      <div>
        {(this.state.load) ?
          <div>
            <h1>{this.props.event.title}</h1>
            <div>
              <h2>Guests Attending</h2>
              <ul>
                {this.props.guests.map(guest => {
                  return <GuestItem guest={guest} key={guest.id} />
                })}
              </ul>
            </div>
            <div>
              <h2>What are people bringing</h2>
              {(this.props.items.length > 0 && this.props.items[0] !== null) ?
                <ul>
                  {this.props.items.map(item => {
                    return <BroughtItem item={item} key={item.id} />
                  })}
                </ul>
                :
                <h3>No things yet!</h3>
              }
            </div>
            <div>
              <Link to={{ pathname: `/event/addGuest/${this.props.event.id}`, query: { id: event.id } }} key={event.id} >
                <h3>Add a Guest</h3>
              </Link>
              <div>
                <Link to={{ pathname: `/event/addItem/${this.props.event.id}`, query: { id: event.id } }} key={event.id} >
                  <h3>Bring Something</h3>
                </Link>
              </div>
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
    guests: state.event.guests,
    items: state.event.items
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
    getItems(eventId) {

      dispatch(getItems(eventId));
    },
    getMe() {

      dispatch(getMe());
    }
  }
}

const ConnectedSingleEventView = connect(mapStateToProps, mapDispatchToProps)(SingleEventView)

export default ConnectedSingleEventView;
