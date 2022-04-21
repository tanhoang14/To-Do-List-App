import React from 'react'
import './AddToDo.scss'
import { toast } from 'react-toastify';
class AddTodo extends React.Component{
    state={
        title:''
    }

    handleOnChangeTitle=(event)=>{
        this.setState({
            title:event.target.value
        })
    }

    handleAddTodo=()=>{
        if(!this.state.title){
            toast.error('Empty!!!Please enter a task')
            return
        }
        let todo={
            id: Math.floor(Math.random()*10000),
            title:this.state.title
        }
        this.props.addNewTodo(todo);
        this.setState({
            title: ''
        })
    }
    
    render(){
        let {title}=this.state;
        return(
            <>
            <h1>What do you want to do for today?</h1>
            <div className='add-todo'>
                <input type="text" value={title} className="textbox"
                    onChange={(event)=>this.handleOnChangeTitle(event)}
                />
                <button type="button" className='add'
                onClick={()=>this.handleAddTodo()}>
                Add</button>
            </div>
            </>
        )
    }
}

export default AddTodo