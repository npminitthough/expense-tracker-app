import { useState, useEffect, useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput";
import ErrorOverlay from "../components/ui/ErrorOverlay";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { ExpensesContext } from "../store/expenses-context";

import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

export default function RecentExpenses(props) {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(false);

  // triggers re-render when Provider updates
  // read and subscribe to context changes
  // default value passed is only used when no matching Provider in the tree - default useful when testing comps. in isolation
  const expensesCxt = useContext(ExpensesContext); // returns the current context value - determined by value prop of nearest Provider

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCxt.setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false); // outside of 'trycatch' as even it fails, we still need false loading state
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 7);
  const recentExpenses = expensesCxt.expenses.filter((expense) => {
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 days"
      fallbackText="No recorded expeneses"
    />
  );
}
