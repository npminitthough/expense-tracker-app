import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";

export default function ExpenseForm(props) {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: "",
  });

  function inputChangedHandler(inputIdentifier, value) {
    setInputValues((currInputValues) => ({
      ...currInputValues,
      [inputIdentifier]: value,
    }));
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expense</Text>
      <View style={styles.inlineInputsContainer}>
        <Input
          label="Amount"
          style={styles.inlineInput}
          textInputConfig={{
            keyBoardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />

        <Input
          label="Date"
          style={styles.inlineInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>

      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inlineInputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inlineInput: {
    flex: 1,
  },
});
