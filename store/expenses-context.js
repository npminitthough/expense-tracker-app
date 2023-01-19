import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenese: (expenses) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const inverted = action.payload.reverse(); // reverse so that latest entries come first as firebase puts things in chronological order
      return inverted;
    case "UPDATE":
      const indexOfItemToUpdate = state.findIndex(
        (el) => el.id === action.payload.id
      );
      const item = state[indexOfItemToUpdate];
      const updatedItem = { ...item, ...action.payload.data };
      const newExpenses = [...state];
      newExpenses[indexOfItemToUpdate] = updatedItem;

      return newExpenses;
    case "DELETE":
      return state.filter((el) => el.id !== action.payload);
    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  // bundle data and functions together to expose them to components through the Provider.
  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
