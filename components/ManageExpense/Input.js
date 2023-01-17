import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export default function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input, invalid && styles.invalidInput];
  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = new StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: GlobalStyles.colours.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colours.primary100,
    color: GlobalStyles.colours.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colours.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colours.error500,
  },
});
