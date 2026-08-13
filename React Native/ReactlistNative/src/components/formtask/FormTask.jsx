import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FormTaskStyles } from "./FormTaskStyles";
import { useContext, useState } from "react";
import { TaskContext } from "../../context/TaskContext";

export const FormTask = () => {

  const { setIdToEdit, postTask, getTasks, taskValue, setTaskValue, editMode, setEditMode, putTask } =
    useContext(TaskContext);

  // salvar/cadastrar/adicionar a tarefa
  const saveTask = () => {
    console.log(`Texto Digitado ${taskValue}`);
    // chama o cadatrar global da task
    postTask(taskValue);

    Alert.alert("Adicionar Tarefa", "Tarefa Adicionada!", [
      { text: "Okk" },
      { text: "Okk 2", onPress: () => setTaskValue("OKk 2 Pressed") },
    ]);
  };

  return (
    <View style={FormTaskStyles.formTaskBox}>
      <TextInput
        style={FormTaskStyles.taskInputName}
        placeholder="Adicione uma tarefa"
        value={taskValue}
        onChangeText={(textoDigitado) => {
          setTaskValue(textoDigitado);
        }}
      />
      <TouchableOpacity
        style={FormTaskStyles.taskButton}
        onPress={() => {
          if (editMode) 
            putTask();
          else 
            saveTask();
        }}
      >
        <Text style={FormTaskStyles.taskButtonText}>Salvar</Text>
      </TouchableOpacity>

      {/* botão Cancelar */}
      {editMode && (
        <TouchableOpacity
          style={FormTaskStyles.taskButton}
          onPress={() => {
            setEditMode(false);//cancela modo de edição
            setTaskValue("");//limpa o form
            setIdToEdit(0)//zera o id que iria editar
          }}
        >
          <Text style={FormTaskStyles.taskButtonText}>Cancelar</Text>
        </TouchableOpacity>
      )}

      <Text style={FormTaskStyles.taskButtonText}>{taskValue}</Text>
    </View>
  );
};
