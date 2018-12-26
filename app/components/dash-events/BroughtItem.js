import React from 'react'



const BroughtItem = (props) => {

  return (
    <ul>
      {(props.item.userId === props.user.id) ?
        <li key={props.item.id}>
          <button type='button' className='submit-button' onClick={() => { props.removeItem(props.item.id) }}>Remove</button>
          <button type='button' className='submit-button'>Update</button>
          {props.item.name} @ qty: {props.item.quantity}
        </li> :
        <li key={props.item.id}>
          {props.item.name} @ qty: {props.item.quantity}
        </li>
      }

    </ul>
  )
}

export default BroughtItem
