import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id, ...action.payload }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
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

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "Shoes",
    amount: 42.0,
    date: new Date("2022-08-24"),
  },
  {
    id: "e2",
    description: "Cashmere hat",
    amount: 19.99,
    date: new Date("2022-10-01"),
  },
  {
    id: "e3",
    description: "Bananas",
    amount: 1.5,
    date: new Date("2022-10-02"),
  },
  {
    id: "e4",
    description: "Portable charger",
    amount: 8.99,
    date: new Date("2022-10-02"),
  },
  {
    id: "e5",
    description: "Protien bars",
    amount: 4.99,
    date: new Date("2022-10-03"),
  },
  {
    id: "e6",
    description: "Bananas",
    amount: 1.5,
    date: new Date("2022-10-02"),
  },
  {
    id: "e7",
    description: "Mangoes",
    amount: 4.0,
    date: new Date("2022-10-31"),
  },
  {
    id: "e8",
    description: "Chocolate",
    amount: 2.99,
    date: new Date("2022-10-31"),
  },
  {
    id: "e9",
    description: "Crisps",
    amount: 2.99,
    date: new Date("2022-11-01"),
  },
];
