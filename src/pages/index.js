import Head from "next/head";
import { GlobalProvider } from "../contexts/global-state";
import YourBalance from "../components/your-balance";
import IncomeExpenses from "../components/income-expenses";
import TransactionList from "../components/transaction-list";
import AddTransaction from "../components/add-transaction";

function PageIndex() {
  return (
    <div>
      <Head>
        <title>Nextjs Expense Tracker App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
          rel="stylesheet"
        />
      </Head>

      <GlobalProvider>
        <h2>Expense Tracker</h2>
        <div className="container">
          <YourBalance />
          <IncomeExpenses />
          <TransactionList />
          <AddTransaction />
        </div>
      </GlobalProvider>
    </div>
  );
}

export default PageIndex;
