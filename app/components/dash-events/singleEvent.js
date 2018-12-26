import React from 'react'
import { connect } from 'react-redux'
import { getEvent, getGuests, getItems, removeGuest, removeItem } from '../../reducers/eventReducer'
import { getMe } from '../../reducers/userReducer'
import { Link, Redirect } from 'react-router-dom'
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
    this.props.getItems(this.props.match.params.eventId);
    this.props.getMe();
    this.setState({ load: true });
  }
  render() {
    console.log(this.props.items, "WATCHING THE ITEMS")
    if (!containsUser(this.props.guests, this.props.user)) {
      return (
        <div>
          {(this.state.load) ?
            <div>
              <div>
                <h2>You are not invited to this feast.</h2>
              </div>
              <div className='link-open'>
                <Link to='/home'>Back to My Dashboard</Link>
              </div>
            </div>
            :
            <div>
              <h2></h2>
            </div>
          }
        </div>

      )
    }

    return (
      <div>
        {(this.state.load) ?
          <div className='single-event-view'>
            <h1>{this.props.event.title}</h1>
            <div>
              <h2>Guests Attending</h2>
              <ul>
                {this.props.guests.map(guest => {
                  return <GuestItem guest={guest} key={guest.id} event={this.props.event} user={this.props.user} removeGuest={this.props.removeGuest} />
                })}
              </ul>
            </div>
            <div>
              <h2>What are people bringing</h2>
              {(this.props.items.length > 0 && this.props.items[0] !== null) ?
                <ul>
                  {this.props.items.map(item => {
                    return <BroughtItem item={item} key={item.id} user={this.props.user} removeItem={this.props.removeItem} />
                  })}
                </ul>
                :
                <h3>No things yet!</h3>
              }
            </div>
            <div>
              <Link to={{ pathname: `/event/addGuest/${this.props.event.id}`, query: { id: this.props.event.id } }} key={this.props.event.id} >
                <h3>Add a Guest</h3>
              </Link>
              <div>
                <Link to={{ pathname: `/event/addItem/${this.props.event.id}`, query: { id: this.props.event.id } }} key={this.props.event.id} >
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
    removeGuest(eventId, userId) {
      dispatch(removeGuest(eventId, userId));
    },
    removeItem(itemId) {
      dispatch(removeItem(itemId));
    },
    getMe() {

      dispatch(getMe());
    }
  }
}

const containsUser = (listOfGuests, selectedUser) => {

  for (let i = 0; i < listOfGuests.length; i++) {
    if (listOfGuests[i].id === selectedUser.id) {
      return true;
    }
  }
  return false;

}

const ConnectedSingleEventView = connect(mapStateToProps, mapDispatchToProps)(SingleEventView)

export default ConnectedSingleEventView;
