import React from 'react'
import { Link } from 'react-router-dom'
import ConnectedSingleEventView from './singleEvent';


const GuestItem = (props) => {

  return (
    <ul>
      <li key={props.guest.id}>
        {props.guest.firstName} {props.guest.lastName}
      </li>


    </ul>
  )
}

export default GuestItem
