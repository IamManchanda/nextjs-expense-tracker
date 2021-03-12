import { createContext, useReducer } from "react";
import AppReducer from "./app-reducer";
import fetcher from "../utils/fetcher";

const initialState = {
  transactions: [],
  error: null,
  loading: true,
};

const { NEXT_PUBLIC_API_URL } = process.env;

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getTransactions() {
    try {
      const { data } = await fetcher(`${NEXT_PUBLIC_API_URL}/transactions`);
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.response.data.error,
      });
    }
  }

  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
