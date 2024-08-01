import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View>
      <Text style={style.h1}>To-do Liste</Text>
    </View>
  );
}

const style = StyleSheet.create({
  h1: {
    fontSize: 48,
    textAlign: "center",
  },
});
