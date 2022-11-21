import React, { useState } from 'react'
import Wrapper from '../assets/wrappers/addTransaction'
import { FormRow, Alert } from ".";
import { useAppContext } from "../context/appContext";



const Deposit = () => {

  const { 
    ilosc, 
    transactionType, 
    makeDeposit,
    token,
    user, 
    displayAlert } = useAppContext()


  const [ difference, setDifference ] = useState(ilosc)
  const [ tType, setTType ] = useState(transactionType[2])


  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(difference, token, user, tType)
    if (!difference || !tType || !token || !user) {
      displayAlert();
      return;
    }
    makeDeposit(difference, token, user?._id, tType )
  }
  
  return (
    <form className="form" onSubmit={handleSubmit}>
          
          <h3>Deposit </h3>
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
              value={difference}
              handleChange={(e) =>setDifference(e.target.value)}
            />
            
            

            <button 
              className="btn btn-block" 
              type="submit"
              // onClick={handleSubmit}
              >
              Deposit
            </button>
          </div>
        </form>
  )
}

export default Deposit