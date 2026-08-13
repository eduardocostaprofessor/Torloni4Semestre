import { createContext, useState } from "react";
import api from "../services/FakeAPIService"




export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [listagemTarefas, setListagemTarefas] = useState([]);
  const [taskValue, setTaskValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [idToEdit, setIdToEdit] = useState(0);

  // busca as tarefas
  const getTasks = async () => {
    try {
      // endereço do servidor (protocolo://endereçoDoServidor:porta/endpoint)
      const APIReturn = await api.get("/taskpoint");
      const APIData = await APIReturn.data;

      setListagemTarefas(APIData);
    } catch (error) {
      console.log("Deu ruim na chamada da api");
      console.log(error);
    }
  };
  // cadastra uma tarefa
  const postTask = async (taskValue) => {
    try {
      await api.post("/taskpoint", {
        descricao: taskValue,
      });
      await getTasks(); //lista as tarefas novamente
      setTaskValue(""); //limpa o formulário
    } catch (error) {
      console.log("Problemas ao cadastrar na api");
      console.log(error);
    }
  };

  // Visualiza os dados no formulário para edição
  const putTaskPreview = (tarefa) => {
    setTaskValue(tarefa.descricao);
    setEditMode(true);
    setIdToEdit(tarefa.id);
  };

  // Envia os dados na API
  const putTask = async () => {
    try {
      await api.put(`/taskpoint/${idToEdit}`, {
        descricao: taskValue,
      });

      await getTasks();
      
      setIdToEdit(0)//zera o id a ser editado
      setTaskValue("")//limpar o formulário
      setEditMode(false)//sai do modo de edição



    } catch (error) {
      console.log("Erro ao Editar os dados, verifique o erro:");
      console.log(error);
    }
  };

  // deleteTask
  const deleteTask = async (id) => {
    try {
      await api.delete(`/taskpoint/${id}`);
      await getTasks();
    } catch (error) {
      console.log("Problemas ao apagar na api");
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        listagemTarefas,
        setListagemTarefas,
        getTasks,
        postTask,
        putTask,
        putTaskPreview,
        deleteTask,
        taskValue,
        setTaskValue,
        editMode,
        setEditMode,
        setIdToEdit,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
