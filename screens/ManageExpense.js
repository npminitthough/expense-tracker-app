import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from "../components/ui/IconButton";
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
  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(currentExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={expensesCtx.expenses.find(
          (el) => el.id === currentExpenseId
        )}
      />

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
  deleteContainer: {
    marginTop: 16,
    padding: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colours.primary200,
    alignItems: "center", // horizontal centering as flex direction is column
  },
});
