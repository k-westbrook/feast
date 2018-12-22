import React from 'react'
import IndividualBroughtItem from './IndividualBroughtItem'


const UserItemList = (props) => {

  return (
    <ul>
      {props.items.map(item => {

        return (
          <li key={item.id}>
            <IndividualBroughtItem item={item} />
          </li>
        )
      })}
    </ul>
  )
}

export default UserItemList
