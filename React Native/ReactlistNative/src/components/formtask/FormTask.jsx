import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FormTaskStyles } from "./FormTaskStyles"
import { useState } from "react"

export const FormTask = () => {

    const [taskValue, setTaskValue] = useState("")

    // salvar/cadastrar/adicionar a tarefa
    const saveTask = ()=> {
        console.log(`Texto Digitado ${taskValue}`)

        Alert.alert(
            "Adicionar Tarefa", 
            "Tarefa Adicionada!",[
                {text: "Okk"},
                {text: "Okk 2", onPress: () => setTaskValue('OKk 2 Pressed')},
            ]
        )
    }

    return (
        <View style={FormTaskStyles.formTaskBox}>
            <TextInput 
                style={FormTaskStyles.taskInputName}
                placeholder="Adicione uma tarefa"
                value={taskValue}
                onChangeText={(textoDigitado)=>{
                    setTaskValue(textoDigitado)
                }}
            />
            <TouchableOpacity
                style={FormTaskStyles.taskButton}
                onPress={()=>{
                    saveTask()
                }}
            >
                <Text 
                    style={FormTaskStyles.taskButtonText}
                >Adicionar</Text>
            </TouchableOpacity>
                
                <Text 
                    style={FormTaskStyles.taskButtonText}
                >{taskValue}</Text>
        </View>
    )
}