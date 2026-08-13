import { ScrollView, Text } from "react-native";
import { TaskListStyle } from "./TaskListStyle";
import { TaskItem } from "../taskitem/TaskItem";
import { useContext, useEffect, useState } from "react";

import { TaskContext } from "../../context/TaskContext";

export const TaskList = () => {
  const {listagemTarefas, getTasks} = useContext(TaskContext)//dados global da context

    // chama a listagem (global) de tarefas na montagem do componente
    useEffect(()=>{
      getTasks()
    }, [])
  return (
    <ScrollView style={TaskListStyle.taskListContainer}>
      {
        listagemTarefas.map((tarefa)=> {
          return(

            <TaskItem 
              key={tarefa.id} 
              id={tarefa.id} 
              descricao={tarefa.descricao}
            />
          )
        })
      }
    </ScrollView>
  );
};
