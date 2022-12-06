import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableHighlight } from "react-native";
import { api } from "../constants";

const TaskForm = () => {
  const [newTask, setNewTask] = useState('');
  const [formError, setFormError] = useState(null);

  const validateForm = () => {
    if (newTask.length < 10) {
      setFormError('The task can not be empty and should contains 10 characters minimum');
      return false;
    }

    return true;
  };

  const addTask = async (content) => {
    if (validateForm()) {
      api
        .post("/task", {
          content: content
        })
        .then((response) => response.data)
        .then((data) => {
          // Rerender component
        });
    }
  }

  return (
    <View style={{paddingBottom: 10}}>
      <View style={styles.container}>
        <TextInput
          style={styles.formContainer}
          placeholder="Add a task"
          placeholderTextColor="#B7C4CF"
          onChangeText={setNewTask}/>
        <TouchableHighlight style={styles.button} onPress={() => addTask(newTask)}>
          <Text>Add</Text>
        </TouchableHighlight>
      </View>
      <View>
        {!!formError && <Text style={styles.textError}>{ formError }</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formContainer: {
    borderWidth: 2,
    borderColor: '#B7C4CF',
    borderRadius: 5,
    padding: 8,
    flex: 1,
  },
  button: {
    backgroundColor: '#B7C4CF',
    color: '#fff',
    borderWidth: 2,
    borderColor: '#B7C4CF',
    borderRadius: 5,
    padding: 8,
    marginLeft: 10,
  },
  textError: {
    fontStyle: 'italic',
    color: '#F87474',
  },
});

export default TaskForm;
