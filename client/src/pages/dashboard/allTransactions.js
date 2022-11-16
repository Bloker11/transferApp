import React from 'react'
import { TransactionsComponent, SearchContainer } from '../../components'

const allTransactions = () => {
  return (
    <>
      <SearchContainer />
      <TransactionsComponent />
    </>
  );
}

export default allTransactions