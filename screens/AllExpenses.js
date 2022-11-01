import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
  const expensesCxt = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesCxt.expenses}
      expensesPeriod={"Total"}
      fallbackText="No recorded expeneses"
    />
  );
}
