import { StyleSheet, Text, View } from 'react-native';
import TaskItemsList from "./components/TaskItemsList";
import TaskForm from "./components/TaskForm";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Tasks list!</Text>
      <TaskForm />
      <TaskItemsList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 30,
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 15,
  },
});
