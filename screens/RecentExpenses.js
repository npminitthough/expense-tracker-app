import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

import { getDateMinusDays } from "../utils/date";

export default function RecentExpenses(props) {
  // triggers re-render when Provider updates
  // read and subscribe to context changes
  // default value passed is only used when no matching Provider in the tree - default useful when testing comps. in isolation
  const expensesCxt = useContext(ExpensesContext); // returns the current context value - determined by value prop of nearest Provider
  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 7);
  const recentExpenses = expensesCxt.expenses.filter((expense) => {
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" />
  );
}
