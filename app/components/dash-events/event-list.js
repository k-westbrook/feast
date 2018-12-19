import React from 'react'
import { Link } from 'react-router-dom'
import ConnectedSingleEventView from './singleEvent';


const EventList = (props) => {

  return (
    <ul>
      {props.events.map(event => {

        return (
          <Link to={{ pathname: `/event/${event.id}`, query: { id: event.id } }} key={event.id} >
            <li >

              {event.title}
            </li>
          </Link>
        )
      })}
    </ul>
  )
}

export default EventList
