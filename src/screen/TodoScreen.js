import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native'
import React, { useState } from 'react'
import {IconButton, iconButton} from "react-native-paper";
import Fallback from './components/Fallback';


const TodoScreen = () => {

    // Init Local States

    const[todo, setTodo] = useState("")
    const[todoList, setTodoList] = useState([]);
    const[EditedTodo, setEditedTodo] =useState(null);
    
    // Handle Add Todo

const handleAddTodo = () =>{
    // Structure of a single todo item
    // {
    //    id:
    //    title:     
    // }   

    if (todo == ""){
        return; //early return
    }

    setTodoList([...todoList, { id: Date.now().toString(), title: todo }]);
    setTodo("");
};
  
    // Handle Delete Todo

    const handleDeleteTodo = (id) =>{
        const updateTodoList = todoList.filter((todo)=> todo.id !== id)
   
    
    setTodoList(updateTodoList);
    };

    // Handle Edit Todo

    const handleEditTodo = (todo)=> {
        setEditedTodo(todo)
        setTodo(todo.title)
    }


    // Handle Update Todo

    const handleUpdateTodo = (tdo) => {
        const updatedTodos = todoList.map((item) =>{
            if(item.id === EditedTodo.id){
            return{...item, title: todo}
        }
        return item;

        });
        setTodoList(updatedTodos);
        setEditedTodo(null);
        setTodo("");
    };

    // Render Todo

    const renderTodos = ({item, index}) =>{
        return (
            <View 
            style={{
                backgroundColor: "#1e90ff", 
                borderRadius: 6, 
                paddingHorizontal: 6, 
                paddingVertical: 12,
                marginBottom: 12,
                flexDirection: "row",
                alignItems: "center",
                shdaowColor: "#000",
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 5,
            }}
        >
            <Text style={{color: "#fff", fontSize: 20, fontWeight: "800", flex: 1 }}>
            {item.title}
            </Text>

            <IconButton icon="pencil" iconColor="#fff" onPress={()=> handleEditTodo(item)}/>
            <IconButton icon="trash-can" iconColor="#fff" onPress ={() => handleDeleteTodo(item.id)} 
            
            />

            </View>
        );
    };
    return (
    <View style={{marginHorizontal: 16 }}>
        <TextInput  
        style={{
        borderWidth: 2, 
        borderColor: "#1e90ff", 
        borderRadius: 6, 
        paddingVertical: 8,
        paddingHorizontal: 16,
       }
    }
       placeholder="Add a task"
       value={todo}
       onChangeText={(userText)=>setTodo(userText)}
      />

     {EditedTodo ? (
        <TouchableOpacity
            style={{
                backgroundColor: "#000",
                borderRadius: 6,
                paddingVertical: 12,
                marginVertical: 34,
                alignItems: "center",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
            }}
            onPress={() => handleUpdateTodo()}
        >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
                Save
            </Text>
        </TouchableOpacity>
    ) : (

        <TouchableOpacity
					style={{
						backgroundColor: "#000",
						borderRadius: 6,
						paddingVertical: 12,
						marginVertical: 34,
						alignItems: "center",
						shadowColor: "#000",
						shadowOffset: { width: 0, height: 2 },
						shadowOpacity: 0.8,
						shadowRadius: 3,
					}}
					onPress={() => handleAddTodo()}
				>
					<Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
						Add
					</Text>
				</TouchableOpacity>
			)}

   {/*} Render Todo List */}  

        <FlatList data={todoList} renderItem={renderTodos} />

        {
         todoList.length <=0 && <Fallback/>
        }
    </View>
    );
};

export default TodoScreen;

const styles = StyleSheet.create({})