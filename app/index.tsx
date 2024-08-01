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
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TaskItem {
  text: string;
  completed: boolean;
}

export default function Index() {
  const [task, setTask] = useState<string>("");
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [filter, setFilter] = useState<"alle" | "færdig" | "aktive">("alle");

  const handleAddTask = () => {
    if (task.trim()) {
      setTaskItems([...taskItems, { text: task, completed: false }]);
      setTask(""); // Clear the input after adding
    }
  };

  const toggleCompleted = (index: number) => {
    const updatedTasks = taskItems.map((item, idx) =>
      idx === index ? { ...item, completed: !item.completed } : item
    );
    setTaskItems(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const updatedTasks = taskItems.filter((_, idx) => idx !== index);
    setTaskItems(updatedTasks);
  };

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

  const filteredTasks = taskItems.filter((item) => {
    if (filter === "færdig") {
      return item.completed;
    }
    if (filter === "aktive") {
      return !item.completed;
    }
    return true; // Den skal vise alle opgaver per default
  });

  return (
    <View style={style.container}>
      <View>
        <Text style={style.h1}>To-do Liste</Text>
      </View>
      <View style={style.filterWrapper}>
        <TouchableOpacity
          style={[style.filterButton, filter === "alle" && style.activeFilter]}
          onPress={() => setFilter("alle")}
        >
          <Text
            style={[
              style.filterText,
              filter === "alle" && style.activeFilterText,
            ]}
          >
            Alle Opgaver
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.filterButton,
            filter === "aktive" && style.activeFilter,
          ]}
          onPress={() => setFilter("aktive")}
        >
          <Text
            style={[
              style.filterText,
              filter === "aktive" && style.activeFilterText,
            ]}
          >
            Aktive Opgaver
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.filterButton,
            filter === "færdig" && style.activeFilter,
          ]}
          onPress={() => setFilter("færdig")}
        >
          <Text
            style={[
              style.filterText,
              filter === "færdig" && style.activeFilterText,
            ]}
          >
            Færdige Opgaver
          </Text>
        </TouchableOpacity>
      </View>
      {/* Vis opgaver */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <ToDoTask
            text={item.text}
            index={index}
            completed={item.completed}
            onDeleteTask={() => deleteTask(index)}
            onToggleCompleted={() => toggleCompleted(index)}
          />
        )}
      />
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
  filterWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 20,
  },
  filterButton: {
    backgroundColor: "#233142",
    borderRadius: 10,
    padding: 5,
  },
  filterText: {
    color: "#e3e3e3",
  },
  activeFilter: {
    backgroundColor: "#e3e3e3",
    borderRadius: 10,
    padding: 5,
  },
  activeFilterText: {
    color: "#233142",
  },
});
