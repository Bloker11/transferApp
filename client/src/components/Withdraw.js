import React, { useState } from 'react'
import { FormRow, Alert } from ".";
import { useAppContext } from '../context/appContext'



const Withdraw = () => {

  const { 
    token,
    ilosc,
    displayAlert,
    withdraw
  
  } = useAppContext()

  const [difference, setDifference ] = useState(ilosc)

  const handleChange = (e)=>{
    e.preventDefault();
    if (!difference || !token ) {
      displayAlert();
      return;
    }
    withdraw( difference, token )
    setDifference(0)
  }
  
  return (
    <form className="form" onSubmit={handleChange}>
          {" "}
          <h3>Withdraw</h3>
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
              value={difference}
              handleChange={e => setDifference(e.target.value)}
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