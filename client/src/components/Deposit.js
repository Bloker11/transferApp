import React from 'react'
import Wrapper from '../assets/wrappers/addTransaction'
import { FormRow, Alert } from ".";


const Deposit = () => {
  return (
    <form className="form">
          
          <h3>Deposit </h3>
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
              
              Deposit
            </button>
          </div>
        </form>
  )
}

export default Deposit