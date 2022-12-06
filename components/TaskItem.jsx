import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TouchableHighlight, View, Pressable, TextInput } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { api } from "../constants";

const TaskItem = (props) => {
  const {
    id,
    content,
    user,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [assignTo, setAssignTo] = useState('');
  const [formError, setFormError] = useState(null);

  const validateForm = () => {
    if (assignTo.length < 3) {
      setFormError('The assigned person can not be empty and should contains 3 characters minimum');
      return false;
    }

    return true;
  };

  const assignTask = async (id, user) => {
    if (validateForm()) {
      api
        .put("/task", {
          id: id,
          user: user
        })
        .then((response) => response.data)
        .then((data) => {
          // Rerender component
          setIsModalVisible(false);
        });
    }
  };

  const deleteItem = async (id) => {
    api
      .delete("/task", {
        id: id,
      })
      .then((response) => response.data)
      .then((data) => {
        // Rerender component
      });
  }

  return (
    <View style={styles.card}>

      <View style={[styles.cardContent, styles.longCardContent]}>
        <Text>{content}</Text>
      </View>

      <View style={styles.cardContent}>
        { !!user && <Text>Assigned to: { user }</Text> }
        { !user &&
          <Button title="Assign"
                  color="#B7C4CF"
                  accessibilityLabel="Assign this task to a user"
                  onPress={() => setIsModalVisible(true)} />
        }
      </View>

      <View style={styles.cardContent}>
        <TouchableHighlight onPress={() => {deleteItem(id)}}>
          <FontAwesomeIcon icon={faTrash} style={styles.trashIcon} />
        </TouchableHighlight>
      </View>

      <View>
        <Modal
          transparent={false}
          animationType={"slide"}
          visible={isModalVisible}
          onRequestClose={() => {setIsModalVisible(false)}} >

          <View style={styles.modal}>
            <Text><Text style={styles.textFontWeightBold}>Task:</Text> {content}</Text>

            <View style={{ marginTop: 20 }}>
              <Text>Who would you like to assign this task to?</Text>
              <TextInput style={styles.formContainer}
                         placeholder="Enter the person's name"
                         placeholderTextColor="#B7C4CF"
                         onChangeText={setAssignTo} />
              {!!formError && <Text style={styles.textError}>{ formError }</Text>}
            </View>

            <View style={styles.buttonsArea}>
              <Pressable
                style={[styles.button, styles.buttonAssign]}
                onPress={() => assignTask(id, assignTo)} >
                <Text>Assign</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsModalVisible(!isModalVisible)} >
                <Text>Hide Modal</Text>
              </Pressable>
            </View>
          </View>

        </Modal>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#B7C4CF',
    borderRadius: 5,
  },
  cardContent: {
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  longCardContent: {
    flex: 1,
  },
  trashIcon: {
    color: '#F87474',
  },
  buttonsArea: {
    flexDirection: 'row',
    justifyContent: "end",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginLeft: 10,
    minWidth: 100,
    textAlign: "center",
  },
  buttonAssign: {
    backgroundColor: "#00FA9A",
  },
  buttonClose: {
    backgroundColor: "#B7C4CF",
  },
  modal: {
    width: '50%',
    margin: 'auto',
    justifyContent: 'center',
  },
  formContainer: {
    borderWidth: 2,
    borderColor: '#B7C4CF',
    borderRadius: 5,
    padding: 8,
  },
  textFontWeightBold: {
    fontWeight: 'bold',
  },
  textError: {
    fontStyle: 'italic',
    color: '#F87474',
  },
});

export default TaskItem;
