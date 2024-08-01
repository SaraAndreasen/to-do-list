import { ToDoTask } from "@/components/Task";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View>
      <View>
        <Text style={style.h1}>To-do Liste</Text>
      </View>
      <View style={style.items}>
        {/*   Opgaver indsættes her */}
        <ToDoTask text={"task 1"} />
        <ToDoTask text={"task 2"} />
        <ToDoTask text={"task 3"} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  h1: {
    fontSize: 48,
    textAlign: "center",
  },
  items: {},
});
