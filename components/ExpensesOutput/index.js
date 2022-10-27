import { View, StyleSheet } from "react-native";

import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colours.primary700,
  },
});

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
    date: new Date("2022-10-02"),
  },
  {
    id: "e8",
    description: "Chocolate",
    amount: 2.99,
    date: new Date("2022-10-04"),
  },
];
