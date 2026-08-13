import { ScrollView, Text } from "react-native";
import { TaskListStyle } from "./TaskListStyle";
import { TaskItem } from "../taskitem/TaskItem";
import { useEffect, useState } from "react";
import axios from "axios";

export const TaskList = () => {

  const [listaTarefas, setListaTarefas] = useState([])

  // criar as funções 
    const getTasks = async () => {
      try {
        // endereço do servidor (protocolo://endereçoDoServidor:porta/endpoint)
        const APIReturn = await axios.get("http://172.16.1.99:3000/taskpoint")
        const APIData = await APIReturn.data
        
        setListaTarefas(APIData)

      } catch (error) {
        console.log("Deu ruim na chamada da api");
        console.log(error);
        
        
      }
      
    }
    // cadTask
    const cadTask = async () => {
      
      console.log("FUNÇÃO POST EM DESENVOLVIMENTO");
      
    }
    // putTask
    const putTask = () => {
      console.log("FUNÇÃO PUT EM DESENVOLVIMENTO");
      
    }
    // deleteTask
    const deleteTask = () => {
      console.log("FUNÇÃO DELETE EM DESENVOLVIMENTO");
      
    }


    // chama a listagem de tarefas na montagem do componente
    useEffect(()=>{
      getTasks()
    }, [])
  return (
    <ScrollView style={TaskListStyle.taskListContainer}>
      {
        listaTarefas.map((tarefa)=> {
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
