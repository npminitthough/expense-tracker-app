import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/ui/IconButton";
import Button from "../components/ui/Button";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

export default function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);
  const currentExpenseId = route.params?.expenseId; //route prop provided by react-navigation
  console.log(currentExpenseId);
  const isEditing = !!currentExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      // needs to be in useLayoutEffect
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(currentExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler() {
    if (isEditing) {
      expensesCtx.updateExpense(currentExpenseId, {
        description: "test-update",
        amount: 15.99,
        date: new Date("2022-09-22"),
      });
    } else {
      expensesCtx.addExpense({
        description: "test-add",
        amount: 19.99,
        date: new Date("2022-09-21"),
      });
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm />
      <View style={styles.buttons}>
        <Button mode="flat" onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colours.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colours.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colours.primary200,
    alignItems: "center", // horizontal centering as flex direction is column
  },
});
