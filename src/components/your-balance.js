import { Fragment, useContext } from "react";
import { GlobalContext } from "../contexts/global-state";
import moneyFormatter from "../utils/money-formatter";

const YourBalance = () => {
  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <Fragment>
      <h4>Your Balance</h4>
      <h1>{moneyFormatter(total)}</h1>
    </Fragment>
  );
};

export default YourBalance;
