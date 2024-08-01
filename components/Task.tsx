import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";

interface ToDoTaskProps {
  text: string;
  index: number;
  onDeleteTask: (index: number) => void;
  onToggleCompleted: () => void;
  completed: boolean;
}

export const ToDoTask: React.FC<ToDoTaskProps> = ({
  text,
  index,
  onDeleteTask,
  onToggleCompleted,
  completed,
}) => {
  const handleDelete = () => {
    onDeleteTask(index);
  };

  return (
    <View style={style.container}>
      <View style={style.itemLeft}>
        <TouchableOpacity
          style={[
            style.square,
            completed ? style.completedSquare : style.square,
          ]}
          onPress={onToggleCompleted}
        ></TouchableOpacity>
        <Text style={style.text}>{text}</Text>
      </View>
      <TouchableOpacity style={style.deleteBtn} onPress={handleDelete}>
        <Text style={style.deleteText}>Slet</Text>
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
    borderColor: "#233142",
    backgroundColor: "white",
    opacity: 0.5,
    borderWidth: 2,
    marginRight: 20,
  },
  deleteBtn: {
    backgroundColor: "#233142",
    padding: 10,
    borderRadius: 5,
  },
  completedSquare: {
    width: 24,
    height: 24,
    borderRadius: 5,
    backgroundColor: "green",
    borderColor: "green",
    opacity: 0.5,
    borderWidth: 2,
    marginRight: 20,
  },
  deleteText: { color: "#e3e3e3" },
});
