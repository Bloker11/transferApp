import React from 'react'
import { FormRow, Alert } from ".";


const Withdraw = () => {
  return (
    <form className="form">
          {" "}
          <h3>Withdraw</h3>
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
            />
            <FormRow
              labelText="Withdraw"
              type="text"
              name="transaction type"
            />

            <button className="btn btn-block" type="submit">
              {" "}
              Withdraw
            </button>
          </div>
        </form>
  )
}

export default Withdraw