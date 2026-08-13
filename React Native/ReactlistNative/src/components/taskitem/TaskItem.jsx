import { Image, Text, TouchableOpacity, View } from "react-native";
import { TaskItemStyle } from "./TaskItemStyle";

// recebe o objeto do item como prop
export const TaskItem = ( { id, descricao } ) => {
    
    return (
        <View style={TaskItemStyle.cardBox}>
            <Text style={TaskItemStyle.cardText}>
                {descricao} - {id}
                </Text>
            
            <TouchableOpacity style={[
                TaskItemStyle.cardButton, 
                TaskItemStyle.cardButtonEditColor
                ]}>
                <Image
                style={TaskItemStyle.cardButtonImage} 
                source={require("../../../assets/edit.png")}
                />
            </TouchableOpacity>
            
            <TouchableOpacity style={[TaskItemStyle.cardButton, TaskItemStyle.cardButtonThashColor]}>
                <Image
                style={TaskItemStyle.cardButtonImage} 
                source={require("../../../assets/trash.jpg")}
                />
            </TouchableOpacity>
        </View>
    )
}