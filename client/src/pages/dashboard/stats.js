import React from "react";
import { useAppContext } from "../../context/appContext";

const Stats = () => {
  const { user } = useAppContext();
  return <div>{user.wallet}</div>;
};

export default Stats;
