import { ToDoTask } from "@/components/Task";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const [task, setTask] = useState<string>();
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);

  useEffect(() => {
    // Load tasks from storage when the component mounts
    const loadTasks = async () => {
      const tasks = await loadTasksFromStorage();
      setTaskItems(tasks);
    };
    loadTasks();
  }, []);

  useEffect(() => {
    // Save tasks to storage whenever taskItems changes
    saveTasksToStorage(taskItems);
  }, [taskItems]);

  const saveTasksToStorage = async (tasks: TaskItem[]) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("taskItems", jsonValue);
    } catch (e) {
      console.error("Failed to save tasks to storage:", e);
    }
  };

  const loadTasksFromStorage = async (): Promise<TaskItem[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem("taskItems");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error("Failed to load tasks from storage:", e);
      return [];
    }
  };

  const handleAddTask = () => {
    setTaskItems([...taskItems, task]);
    setTask("");
  };

  const toggleCompleted = (index) => {
    const itemsCopy = [...taskItems];

    itemsCopy[index].completed = !itemsCopy[index].completed;

    setTaskItems(itemsCopy);
  };

  const deleteTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };
  console.log("ss", taskItems);
  return (
    <View style={style.container}>
      <View>
        <Text style={style.h1}>To-do Liste</Text>
      </View>
      <View style={style.items}>
        {/*   Opgaver indsættes her */}
        {taskItems.map((item, index, text, completed) => (
          <ToDoTask
            key={index}
            text={text}
            completed={completed}
            deleteTask={() => deleteTask(index)}
            toggleCompleted={() => toggleCompleted(index)}
          />
        ))}
      </View>

      {/* Lav ny opgave */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={style.addTaskWrapper}
      >
        <TextInput
          style={style.input}
          placeholder={"Lav ny opgave..."}
          placeholderTextColor={"#e3e3e3"}
          onChangeText={(text) => setTask(text)}
          value={task}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={style.createTaskBtn}>
            <Text style={style.addTaskText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: "#455d7a" },
  h1: {
    fontSize: 48,
    textAlign: "center",
  },
  items: { paddingHorizontal: 20, paddingVertical: 10 },
  taskWrapper: {},
  input: {
    backgroundColor: "#233142",
    borderColor: "#e3e3e3",
    padding: 20,
    width: 250,
    borderRadius: 20,
    borderWidth: 1,
    color: "#e3e3e3",
  },
  addTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  createTaskBtn: {
    width: 68,
    height: 68,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#233142",
    borderColor: "#e3e3e3",
    borderWidth: 1,
  },
  addTaskText: { color: "#e3e3e3" },
});
