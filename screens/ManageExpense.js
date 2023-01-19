import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../utils/http";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const expensesCtx = useContext(ExpensesContext);
  const currentExpenseId = route.params?.expenseId; //route prop provided by react-navigation
  const isEditing = !!currentExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      // needs to be in useLayoutEffect
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(currentExpenseId);
      expensesCtx.deleteExpense(currentExpenseId);
      navigation.goBack(); // no need to set isSubmitting to false as we change screen here
    } catch (error) {
      setError("Could not delete expense - please try again later,");
      setIsSubmitting(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        expensesCtx.updateExpense(currentExpenseId, expenseData);
        await updateExpense(currentExpenseId, expenseData); // using await so closing the modal happens after successful update
      } else {
        const id = await storeExpense(expenseData);
        expensesCtx.addExpense({ ...expenseData, id });
      }

      navigation.goBack();
    } catch (error) {
      setError("Could not save changes. Please try again later.");
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
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
