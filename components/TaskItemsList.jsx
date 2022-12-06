import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { SafeAreaView, FlatList, Text } from "react-native";
import { NativeBaseProvider } from "native-base";
import { api } from "../constants";
import { connect } from "react-redux";
import { getTasks } from "../TasksActions";
import { bindActionCreators } from "redux";

const TaskItemsList = (props) => {
  const fetchData = () => {
    api
      .get("/task")
      .then((response) => response.data)
      .then((data) => {
        props.getTasks(data);
      });
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
        {props.tasks && (
          <FlatList
            data={props.tasks}
            renderItem={renderItem}
            keyExtractor={task => task.id}
          />
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const mapStateToProps = (state) => {
  const { tasks } = state;
  return { tasks }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getTasks,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TaskItemsList);
