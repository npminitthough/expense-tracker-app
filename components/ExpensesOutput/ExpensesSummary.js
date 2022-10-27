import { Text, View, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

export default function ExpensesSummary({ expenses, periodName }) {
  const totalExpenses = expenses.reduce(
    (accumulator, currExpense) => accumulator + currExpense.amount,
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.total}>£{totalExpenses.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colours.primary50,
    borderRadius: 6,
    flexDirection: "row", // affects children
    justifyContent: "space-between", // affects children
    alignItems: "center", // affects children
  },
  period: {
    fontSize: 16,
    color: GlobalStyles.colours.primary400,
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colours.primary500,
  },
});
