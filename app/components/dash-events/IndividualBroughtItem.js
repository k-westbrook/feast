import React from 'react'



const IndividualBroughtItem = (props) => {

  return (
    <ul>
      <li key={props.item.id}>
        You are bringing {props.item.name} @ qty: {props.item.quantity} forFeast
      </li>


    </ul>
  )
}

export default IndividualBroughtItem
