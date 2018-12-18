import React from 'react'

const EventList = (props) => {

  return (
    <ul>
      {props.events.map(event => {
        return (
          <li key={event.id}>
            {event.title}
          </li>
        )
      })}
    </ul>
  )
}

export default EventList
