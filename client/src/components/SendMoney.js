import React, { useState } from 'react'
import { FormRow, Alert } from ".";
import { useAppContext } from '../context/appContext';


const SendMoney = () => {
  const { 
    ilosc, 
    receiver,
    sendMoney,
    token,
    displayAlert } = useAppContext()

    const [recipient, setRecipient ] = useState(receiver)
    const [difference, setDifference ] = useState(ilosc)


    const handleSubmit = (e) =>{
      e.preventDefault()
      if (!difference || !token || !recipient) {
        displayAlert();
        return;
      }
      sendMoney(difference, token, recipient )
      setRecipient('')
      setDifference(0)
    }

    return (
    <form className="form" onSubmit={handleSubmit}>
          
          <h3>Send money</h3>
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
              value={difference}
              handleChange={ e => setDifference(e.target.value)}
              
            />
            
            <FormRow
              labelText="To who?"
              type="text"
              name="userId"
              value ={recipient}
              handleChange={ e => setRecipient(e.target.value)}
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