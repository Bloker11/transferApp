import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";
import Wrapper from "../../assets/wrappers/stats";

const Stats = () => {
  const { trans,user } = useAppContext();

  return (
    
    <Wrapper>
      <h1>${user.wallet}</h1>
      {trans.length > 0 && <ChartsContainer />}
    </Wrapper>
  );
};

export default Stats;
