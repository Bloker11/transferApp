import React from "react";
import Wrapper from "../../assets/wrappers/addTransaction";
import { FormRow, Alert } from "../../components";

const addTransaction = () => {
  return (
    <>
      <Wrapper>
        <form className="form">
          {" "}
          {/*//onSubmit={handleSubmit} */}
          <h3>Deposit </h3>
          {/* {showAlert && <Alert />} */}
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
              // value={name}
              // handleChange={(e) => setName(e.target.value)}
            />
            {/* <FormRow
              labelText="Deposit"
              type="text"
              name="transaction type"
              // value={lastName}
              // handleChange={(e) => setLastName(e.target.value)}
            /> */}
            <FormRow
              labelText="To who?"
              type="text"
              name="userId"
              // value={lastName}
              // handleChange={(e) => setLastName(e.target.value)}
            />

            <button className="btn btn-block" type="submit">
              {" "}
              {/*disabled={isLoading} */}
              Deposit
            </button>
          </div>
        </form>
      </Wrapper>
      <Wrapper>
        <form className="form">
          {" "}
          {/*//onSubmit={handleSubmit} */}
          <h3>Send money</h3>
          {/* {showAlert && <Alert />} */}
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
              // value={name}
              // handleChange={(e) => setName(e.target.value)}
            />
            {/* <FormRow
              labelText="Deposit"
              type="text"
              name="transaction type"
              // value={lastName}
              // handleChange={(e) => setLastName(e.target.value)}
            /> */}
            <FormRow
              labelText="To who?"
              type="text"
              name="userId"
              // value={lastName}
              // handleChange={(e) => setLastName(e.target.value)}
            />

            <button className="btn btn-block" type="submit">
              {" "}
              {/*disabled={isLoading} */}
              Send
            </button>
          </div>
        </form>
      </Wrapper>
      <Wrapper>
        <form className="form">
          {" "}
          {/*//onSubmit={handleSubmit} */}
          <h3>Withdraw</h3>
          {/* {showAlert && <Alert />} */}
          <div className="form-center">
            <FormRow
              labelText="How Much?"
              type="text"
              name="amount"
              // value={name}
              // handleChange={(e) => setName(e.target.value)}
            />
            <FormRow
              labelText="Withdraw"
              type="text"
              name="transaction type"
              // value={lastName}
              // handleChange={(e) => setLastName(e.target.value)}
            />

            <button className="btn btn-block" type="submit">
              {" "}
              {/*disabled={isLoading} */}
              Withdraw
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default addTransaction;
