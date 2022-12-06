import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { SafeAreaView, FlatList, Text } from "react-native";
import { NativeBaseProvider } from "native-base";
import { api } from "../constants";

const TaskItemsList = () => {
  const [tasks, manageTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    api
      .get("/task")
      .then((response) => response.data)
      .then((data) => {
        manageTasks(data);
      });
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TaskItem
      id={item.id}
      content={item.content}
      user={item.user}
    />
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        {loading && <Text>Loading...</Text>}
        {tasks && (
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={task => task.id}
          />
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default TaskItemsList;
