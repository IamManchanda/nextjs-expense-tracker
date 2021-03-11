import { Fragment, useContext } from "react";
import TransactionItem from "./transaction-item";
import { GlobalContext } from "../contexts/global-state";

const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <Fragment>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </Fragment>
  );
};

export default TransactionList;
