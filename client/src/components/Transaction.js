import moment from "moment";
import { AiOutlineUser } from "react-icons/ai";
import { FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Transaction";

import TransactionInfo from "./TransactionInfo";

const Transaction = ({
  amount, transaction, name
}) => {
    


  return (
    <Wrapper>
      <header>
        <div className="main-icon">{transaction.charAt(0)}</div>
        <div className="info">
          <h5>{transaction}</h5>
          <p>{amount}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TransactionInfo icon={<AiOutlineUser />} text={name} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Transaction;
