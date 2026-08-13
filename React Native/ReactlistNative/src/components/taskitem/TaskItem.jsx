import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { TaskItemStyle } from "./TaskItemStyle";
import { useContext } from "react";
import { TaskContext } from "../../context/TaskContext";

// recebe o objeto do item como prop
export const TaskItem = ( { id, descricao } ) => {
    // states globais
    const { deleteTask, putTaskPreview } = useContext(TaskContext)
    
    // states e functions locais
    const deleteTaskConfirm = (tarefa) => {
        // aqui vamos verificar se o usuário quer apagar
        Alert.alert("Apagar", `Você quer apagar ${tarefa.descricao}`, [
            { text: "Não" },
            { text: "Sim", onPress: () => { deleteTask(id) } },
        ])
    }

    

    return (
        <View style={TaskItemStyle.cardBox}>
            <Text style={TaskItemStyle.cardText}>
                {descricao}
                </Text>
            
            <TouchableOpacity style={[
                TaskItemStyle.cardButton, 
                TaskItemStyle.cardButtonEditColor
                ]}
                onPress={()=>{
                    putTaskPreview({ id, descricao })
                }}
                
                >
                <Image
                style={TaskItemStyle.cardButtonImage} 
                source={require("../../../assets/edit.png")}
                />
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[TaskItemStyle.cardButton, TaskItemStyle.cardButtonThashColor]}
                onPress={ ()=>{
                    deleteTaskConfirm( {id, descricao} )
                }}
            >
                <Image
                style={TaskItemStyle.cardButtonImage} 
                source={require("../../../assets/trash.jpg")}
                />
            </TouchableOpacity>
        </View>
    )
}