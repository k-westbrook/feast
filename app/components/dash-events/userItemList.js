import React from 'react'
import BroughtItem from './BroughtItem'


const UserItemList = (props) => {

  return (
    <ul>
      {props.items.map(item => {

        return (
          <li key={item.id}>
            <BroughtItem item={item} />
          </li>
        )
      })}
    </ul>
  )
}

export default UserItemList
