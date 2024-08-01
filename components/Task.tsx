import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

export const ToDoTask = (props) => {
  return (
    <View style={style.container}>
      <View style={style.itemLeft}>
        <View style={style.square}></View>
        <Text style={style.text}>{props.text}</Text>
      </View>
      <View style={style.checkBox}></View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  text: {},
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  itemRight: { backgroundColor: "yellow" },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "red",
    borderRadius: 5,
    opacity: 0.5,
    marginRight: 20,
  },
  checkBox: {
    width: 12,
    height: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
});
