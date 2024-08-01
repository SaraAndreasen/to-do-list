import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

interface ToDoTaskProps {
  text: string;
  index: number;
  deleteTask: (index: number) => void;
  toggleCompleted: (index: number) => void;
  completed: boolean;
}

export const ToDoTask: React.FC<ToDoTaskProps> = ({
  text,
  index,
  deleteTask,
  toggleCompleted,
  completed,
}) => {
  const handleDelete = () => {
    deleteTask(index);
  };

  const handleToggleCompleted = () => {
    toggleCompleted(index);
  };

  console.log("ehhehehe", text, index, deleteTask, toggleCompleted);

  console.log("Rendering ToDoTask:", { text, completed });

  console.log({ text, index, deleteTask }); // Check individual props
  return (
    <View style={style.container}>
      <View style={style.itemLeft}>
        <TouchableOpacity
          style={[style.square, completed && style.completedSquare]}
          onPress={handleToggleCompleted}
        ></TouchableOpacity>
        <Text style={style.text}>{text}</Text>
      </View>
      <TouchableOpacity style={style.deleteBtn} onPress={handleDelete}>
        <Text>Slet</Text>
      </TouchableOpacity>
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
    borderRadius: 5,
    borderColor: "yellow",
    opacity: 0.5,
    borderWidth: 2,
    marginRight: 20,
  },
  deleteBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  completedSquare: {
    width: 24,
    height: 24,
    borderRadius: 5,
    backgroundColor: "yellow",
    opacity: 0.5,
    borderWidth: 2,
    marginRight: 20,
  },
});
