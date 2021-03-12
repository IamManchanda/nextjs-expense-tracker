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
        payload: error.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await fetcher(`${NEXT_PUBLIC_API_URL}/transactions/${id}`, {
        method: "DELETE",
      });
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.error,
      });
    }
  }

  async function addTransaction(transaction) {
    try {
      const { data } = await fetcher(`${NEXT_PUBLIC_API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });
      dispatch({
        type: "ADD_TRANSACTION",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error.error,
      });
    }
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
