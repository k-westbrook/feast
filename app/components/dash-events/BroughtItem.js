import React from 'react'



const BroughtItem = (props) => {
  console.log(props.item);
  return (
    <ul>
      <li key={props.item.id}>
        {props.item.name} @ qty: {props.item.quantity}
      </li>


    </ul>
  )
}

export default BroughtItem
