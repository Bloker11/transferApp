import React from 'react'
import { FormRow, Alert } from ".";


const SendMoney = () => {
  return (
    <form className="form">
          
          <h3>Send money</h3>
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
              
            />
            
            <FormRow
              labelText="To who?"
              type="text"
              name="userId"
              
            />

            <button className="btn btn-block" type="submit">
              {" "}
              Send
            </button>
          </div>
        </form>
  )
}

export default SendMoney