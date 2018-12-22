import React from 'react'
import { connect } from 'react-redux'
import { addItem } from '../../reducers/eventReducer'
import { getMe } from '../../reducers/userReducer'
import { Link } from 'react-router-dom'




const AddItem = (props) => {




  const handleSubmit = props.handleSubmit;
  return (

    <div className='create-div'>
      <form className='login-form' onSubmit={handleSubmit}>
        <div>
          <div className='input-field'>
            <label htmlFor='name'>Name of Item</label>
            <input type='name' name='name' className='input' />
          </div>
          <div className='input-field'>
            <label htmlFor='quantity'>quantity</label>
            <input type='quantity' name='quantity' className='input' />
          </div>

        </div>
        <div>
          <button className='submit-button' type='submit'>Sign Up</button>
        </div>
      </form>

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

  return {
    handleSubmit(evt) {
      evt.preventDefault()

      const name = evt.target.name.value;
      const quantity = evt.target.quantity.value;
      const eventId = ownProps.match.params.eventId;

      dispatch(addItem({ name, quantity }, eventId)).then(() => {
        history.push(`/event/${eventId}`);
      })


    },
    getMe() {

      dispatch(getMe());
    }


  }
}

const ConnectedAddItem = connect(mapStateToProps, mapDispatchToProps)(AddItem)

export default ConnectedAddItem
