import moment from "moment";
import { AiOutlineUser } from "react-icons/ai";
import { FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Transaction";
import { useAppContext } from "../context/appContext";

import TransactionInfo from "./TransactionInfo";

const Transaction = ({
  amount, transaction, name, time
}) => {
    const {user} = useAppContext()


  return (
    <Wrapper>
      <header>
        <div className="main-icon">{transaction.charAt(0)}</div>
        <div className="info">
          <h5>{transaction}</h5>
          {transaction === "deposit" || name !== user.name ? (
            <p>+${amount}</p>
          ) : (
            <span>-${amount}</span>
          )}
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <TransactionInfo icon={<AiOutlineUser />} text={name} />
          <TransactionInfo icon={<FaCalendarAlt />} text={time} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Transaction;
