import React from 'react'


const GuestItem = (props) => {

  return (
    <ul>
      {((props.user.id === props.event.admin || props.user.id === props.guest.id) && props.guest.id !== props.event.admin) ?
        <li key={props.guest.id}>
          <button type='button' className='submit-button' onClick={() => { props.removeGuest(props.event.id, props.guest.id) }}>Remove</button>
          {props.guest.firstName} {props.guest.lastName}
        </li>
        :

        <li key={props.guest.id}>
          {props.guest.firstName} {props.guest.lastName}
        </li>
      }

    </ul>
  )
}

export default GuestItem
