import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/transactionsContainer";
import PageBtnContainer from "./PageBtnContainer";
import Transaction from "./Transaction";

const TransactionsComponent = () => {
  const {
    getTrans,
    trans,
    isLoading,
    page,
    totalTrans,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
    showAlert,
    user,
    token,
    amount,
    sender,
    searchAmount,
    time
    
  } = useAppContext();
  useEffect(() => {

    getTrans(user, token);
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (!trans) {
    return (
      <Wrapper>
        <h2>No transactions to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {showAlert && <Alert />}
      <h5>
        {totalTrans} transaction{trans.length > 1 && "s"} found
      </h5>
      <div className="trans">
        {trans.map((tran, i) => {
          if (
            sender[i].toLowerCase().startsWith(search.toLowerCase()) &&
            searchAmount === ""
          ) {
            return (
              <Transaction
                key={tran._id}
                transaction={tran}
                amount={amount[i]}
                name={sender[i]}
                time={time[i]}
              />
            );
          }
          if (
            sender[i].toLowerCase().startsWith(search.toLowerCase()) &&
            amount[i] === parseInt(searchAmount)
          ) {
            return (
              <Transaction
                key={tran._id}
                transaction={tran}
                amount={amount[i]}
                name={sender[i]}
                time={time[i]}
              />
            );
          }
          
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default TransactionsComponent;
