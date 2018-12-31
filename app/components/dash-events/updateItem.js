import React from 'react'
import { connect } from 'react-redux'
import { updateItem } from '../../reducers/eventReducer'
import { getMe } from '../../reducers/userReducer'
import { BrowserRouter as Router, Route, Switch, withRouter, Link } from 'react-router-dom'




const UpdateItem = (props) => {

  const item = props.location.query.item;



  const handleSubmit = props.handleSubmit;
  return (

    <div className='create-div'>
      <h1>Update Items</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <div className='input-field'>
            <label htmlFor='name'>Name of Item</label>
            <input type='text' name='name' className='input' defaultValue={item.name} />
          </div>
          <div className='input-field'>
            <label htmlFor='quantity'>quantity</label>
            <input type='text' name='quantity' className='input' defaultValue={item.quantity} />
          </div>

        </div>
        <div>
          <button className='submit-button' type='submit'>Update Now</button>
        </div>
      </form>
      <div className='link-open'>
        <Link to='/home'>Back to My Dashboard</Link>
      </div>

    </div>
  )


}

const mapStateToProps = (state, ownProps) => {

  return {
    items: state.event.items,
    user: state.user.selectedUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  const history = ownProps.history;
  console.log(history, 'history')
  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const name = evt.target.name.value;
      const quantity = evt.target.quantity.value;
      const eventId = ownProps.match.params.eventId;
      const itemId = ownProps.match.params.itemId;

      dispatch(updateItem({ name, quantity }, eventId, itemId)).then(() => {
        history.push(`/event/${eventId}`);
      })


    },
    getMe() {

      dispatch(getMe());
    }


  }
}

const ConnectedUpdateItem = connect(mapStateToProps, mapDispatchToProps)(UpdateItem)

export default ConnectedUpdateItem
