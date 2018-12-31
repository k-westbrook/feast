import React from 'react'
import { Link } from 'react-router-dom'


const BroughtItem = (props) => {
  console.log(props, "PROPS OF THE BROUGHT ITEM")
  return (
    <ul>
      {(props.item.userId === props.user.id) ?
        <li key={props.item.id}>
          <button type='button' className='submit-button' onClick={() => { props.removeItem(props.item.id) }}>Remove</button>
          <Link to={{ pathname: `/event/updateItem/${props.event.id}/${props.item.id}`, query: { item: props.item } }} >
            <button type='button' className='submit-button'>Update</button>
          </Link>
          {props.item.name} @ qty: {props.item.quantity}

        </li> :
        <li key={props.item.id}>
          {props.item.name} @ qty: {props.item.quantity}
        </li>
      }

    </ul >
  )
}

export default BroughtItem
