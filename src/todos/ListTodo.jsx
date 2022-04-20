import React from 'react'
import AddTodo from './adds/AddToDo';
import './ListTodo.scss'
import { toast } from 'react-toastify';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {FaTrash} from 'react-icons/fa'
import {FaEdit} from 'react-icons/fa'

class ListTodo extends React.Component{
    state={
        listTodos:[
            {id:'todo1',title:'Doing homework'},
            {id:'todo2',title:'Making Video'},
            {id:'todo3',title:'Fixing Bugs'},
            {id:'todo4',title:'Eating'}
        
        ],
        editTodo:{}
    }
    
    addNewTodo=(todo)=>{
        this.setState({
           listTodos: [...this.state.listTodos,todo]
        })
        toast.success('🦄 You have added a task successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    handleDeleteTodo=(todo)=>{
        let currentTodos=this.state.listTodos
        currentTodos=currentTodos.filter(item=>item.id!=todo.id)
        this.setState({
            listTodos: currentTodos
        })
        toast.success("Delete Success")
    }
    
    handleEditTodo=(todo)=>{
        let{editTodo,listTodos}=this.state

        let isEmptyObj=Object.keys(editTodo).length===0

        if(isEmptyObj===false &&editTodo.id===todo.id){
            let listTodosCopy=[...listTodos]
            let objIndex=listTodosCopy.findIndex((item=>item.id===todo.id))
            listTodosCopy[objIndex].title=editTodo.title
            this.setState({
                listTodos:listTodosCopy,
                editTodo:{}
            })
            toast.info("Update todo succeed!")
            return;
        }
     

        
        this.setState({
            editTodo:todo
        })
        
    }

    handleOnchangeEditTodo=(event)=>{
        
        let editTodoCopy={...this.state.editTodo}
        editTodoCopy.title=event.target.value;
        this.setState({
            editTodo:editTodoCopy
        })
    }
    render(){
        let {listTodos,editTodo}=this.state;
        let isEmptyObj=Object.keys(editTodo).length===0
        return(
        <div className='list-todo-container'>
            <AddTodo
                addNewTodo={this.addNewTodo}
            />
            <div className='list-todo-content'>
                {listTodos &&listTodos.length>0&&
                    listTodos.map((item,index)=>{
                        return(
                            <div className='todo-child' key={item.id}>
                            {isEmptyObj===true ?
                            <span> {index+1}-{item.title}</span> 
                            :
                            <>
                            {editTodo.id===item.id?
                            <span>{index+1}-<input value={editTodo.title} onChange={(event)=>this.handleOnchangeEditTodo(event)}/></span>
                            :
                            <span> {index+1}-{item.title}</span> 
                            }
                            </>
                            }
                            <div className='list-buttons'>
                                <FaEdit className='Edit'
                                    onClick={()=>this.handleEditTodo(item)} />
                                    
                                <FaTrash className='Delete'
                                    onClick={()=>this.handleDeleteTodo(item)}/>
                            </div>
                        </div>
                        )
                    })
                }
            </div>
        </div>

        )
    }
    
}
export default ListTodo;