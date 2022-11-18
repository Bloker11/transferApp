import React from "react";
import Wrapper from "../../assets/wrappers/addTransaction";
import { FormRow, Alert } from "../../components";
import Deposit from '../../components/Deposit'
import Withdraw from '../../components/Withdraw'
import SendMoney from '../../components/SendMoney'

const addTransaction = () => {
  return (
    <>
      <Wrapper>
        <Deposit/>
      </Wrapper>
      <Wrapper>
        <SendMoney/>
      </Wrapper>
      <Wrapper>
        <Withdraw/>
      </Wrapper>
    </>
  );
};

export default addTransaction;
