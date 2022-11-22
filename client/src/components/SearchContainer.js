import { FormRow, FormRowSelect } from ".";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useState, useMemo } from "react";
const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState("");
  const [localAmount, setLocalAmount] = useState();
  const {
    isLoading,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    transactionType,
    amount,
    
  } = useAppContext();
  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const debounce = () => {
    let timeoutID;
    return (e) => {
      if(e.target.name === "search"){
      setLocalSearch(e.target.value);
      }
      if (e.target.name === "searchAmount") {
        setLocalAmount(e.target.value);
      }
      
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange({ name: e.target.name, value: e.target.value });
      }, 1000);
    };
  };
  
  const optimizedDebounce = useMemo(() => debounce(), []);
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}

          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          <FormRow
            type="amount"
            name="searchAmount"
            value={localAmount}
            handleChange={optimizedDebounce}
          />
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
