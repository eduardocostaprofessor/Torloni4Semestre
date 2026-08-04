// imports
import editIcon from "./assets/edit-icon.svg";
import trashIcon from "./assets/trash-icon.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // states e variáveis

  // representa a lista de tarefas em array de objetos
  const [tasklist, setTasklist] = useState([]);
  // representa o dado digitado no input
  const [taskValue, setTaskValue] = useState("");
  //modo de edição true | false
  const [editMode, setEditMode] = useState(false);
  // id do cadastro a ser editado
  const [idToEdit, setIdToEdit] = useState(0);

  // funções e effects
  // CRUD

  // Read (Get)
  const getTasks = async () => {
    try {
      // chamar a api
      const APIReturn = await axios.get("http://localhost:3000/taskpoin");
      const dataAPI = await APIReturn.data;
      console.log(dataAPI);

      // e armazenar os dados no state (tasklist)
      setTasklist(dataAPI);
    } catch (error) {
      alert("Erro ao carregar os dados");
      console.log(error);
    }
  };

  // Create (Post)
  const createTask = async (e) => {
    //parar|capturar o evento de submit do formulário
    e.preventDefault();

    if (taskValue.trim().length == 0) {
      //forulário vazio?
      alert("Preencha o texto da tarefa");
      return false;
    }

    try {
      await axios.post("http://localhost:3000/taskpoin", {
        descricao: taskValue,
      });

      alert("Tarefa cadastrada!");
      getTasks();
    } catch (error) {
      alert("Erro ao cadastrar a tarefa");
      console.log(error);
    }
  };

  // Update (Put/Patch)
  // visualizar edição (ver os dados no formulário)
  const putTask = (taskItem) => {
    // legar os dados para o forulário (setTaskValue)
    setTaskValue(taskItem.descricao);
    // sinalizar o forulário que é pra editar e ao invés de cadastrar (setEditMode)
    setEditMode(true);
    // preencher o id para edição (setIdToEdit)
    setIdToEdit(taskItem.id);
  };

  // confirmar o cadastro na API
  const confirmPutTask = async (e) => {
    e.preventDefault();
    // validar o form
    if (taskValue.trim().length == 0) {
      alert("Preencha a tarefa corretamente");
      return false;
    }

    try {
      axios.put(`http://localhost:3000/taskpoin/${idToEdit}`, {
        descricao: taskValue,
      });
      alert("A tarefa foi editada");
      // atualiza o cadastro na tela
      getTasks();

      // reseta os dados da edição e formulário
      setEditMode(false);
      setIdToEdit(0);
      setTaskValue("");
    } catch (error) {
      alert("Erro ao editar a tarefa");
      // console.log(error);
    }
  };

  // Delete (Delete)
  const deleteTask = async (taskItem) => {
    const querApagar = confirm(
      `Quer realmente apagar a tarefa: '${taskItem.descricao}' `,
    );

    if (!querApagar) return false;

    try {
      await axios.delete(`http://localhost:3000/taskpoin/${taskItem.id}`);
      alert("Registro apagado com sucesso!");
      getTasks();
    } catch (error) {
      // log(error)
      alert(`Erro ao apagar`);
    }
    // apagar na api -
  };

  // roda na montagem do componente - ciclo de vida dos componentes React
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <header className="header-section">
        <h1 className="header-section__title">React List</h1>
      </header>

      <main className="body-section">
        <form
          className="cad-task"
          onSubmit={editMode ? confirmPutTask : createTask}
        >
          <input
            type="text"
            className="cad-task__entry"
            placeholder="Adicione uma tarefa"
            value={taskValue}
            onChange={(e) => {
              setTaskValue(e.target.value);
            }}
          />
          <p>State: {taskValue}</p>
          <p>Id pra editar: {idToEdit}</p>
          <button className="cad-task__btn-confirm">Adicionar</button>
          {editMode && (
            <button
              className="cad-task__btn-confirm"
              type="button"
              onClick={() => {
                // reseta os dados da edição e formulário
                setEditMode(false)
                setIdToEdit(0)
                setTaskValue("")
              }}
            >
              Cancelar
            </button>
          )}
        </form>

        <section className="cardlist">
          {tasklist.map((task) => {
            return (
              <article className="cardtask" key={task.id}>
                <p className="cardtask__task-text">{task.descricao}</p>

                <div className="cardtask__icon-box">
                  <div className="cardlist__icon">
                    <img
                      src={editIcon}
                      alt="Imagem de uma caneta - ação editar tarefa"
                      onClick={() => {
                        putTask(task);
                      }}
                    />
                  </div>
                  <div className="cardlist__icon">
                    <img
                      src={trashIcon}
                      alt="Imagem de uma lixeira - ação excluir tarefa"
                      onClick={() => {
                        deleteTask(task);
                      }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      </main>

      <footer className="footer-section">
        <p className="footer-section__right-text">
          2026 React List - Todos os direitos reservados
        </p>
      </footer>
    </>
  );
}

export default App;
