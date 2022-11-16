import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Alert from "./Alert";
import Wrapper from "../assets/wrappers/transactionsContainer";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
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
  } = useAppContext();
  useEffect(() => {
    getTrans();
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);

  if (trans.length === 0) {
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
        {totalTrans} job{trans.length > 1 && "s"} found
      </h5>
      <div className="trans">
      
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
