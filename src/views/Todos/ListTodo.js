import React from "react";
import AddTodo from "./AddTodo";
import './ListTodo.scss';
import { toast } from 'react-toastify';


export default class ListTodo extends React.Component {
    state = {
        listTodo: [
            { id: '1', title: "Doing homework" },
            { id: '2', title: "Doing homework1" },
            { id: '3', title: "Doing homework2" },
        ],
        editTodo: {}
    }

    addNewTodo = (todo) => {
        this.setState({
            listTodo: [...this.state.listTodo, todo]
        })
        toast.success('Success!')
    }

    handleDeleteTodo = (todo) => {
        let currentTodo = this.state.listTodo;
        currentTodo = currentTodo.filter(item => item.id !== todo.id)
        this.setState({
            listTodo: currentTodo
        })
        toast.success("Delete Success!")
    }

    handleEditTodo = (todo) => {
        let { editTodo, listTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        //save
        if (isEmptyObj === false && editTodo.id === todo.id) {
            let listTodosCopy = [...listTodo]
            let objIndex = listTodosCopy.findIndex((item => item.id === todo.id))
            listTodosCopy[objIndex].title = editTodo.title;
            this.setState({
                listTodo: listTodosCopy,
                editTodo: {}
            })
            toast.success('Edit Success')
            return;
        }
        //edit
        this.setState({
            editTodo: todo
        })
    }

    handleOnChangeEditTodo = (event) => {
        let editTodoCopy = { ...this.state.editTodo };
        editTodoCopy.title = event.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }

    render() {
        let { listTodo, editTodo } = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;

        return (
            <div className="list-todo-container">
                <AddTodo addNewTodo={this.addNewTodo} />
                <div className="list-todo-content">
                    {listTodo && listTodo.length > 0 &&
                        listTodo.map((item, index) => {
                            return (
                                <div className="todo-child" key={item.id}>
                                    {isEmptyObj === true ?
                                        <span> {index + 1} - {item.title}</span>
                                        :
                                        <>
                                            {editTodo.id === item.id ?
                                                <span>
                                                    {index + 1} - <input value={editTodo.title}
                                                        onChange={(event) => this.handleOnChangeEditTodo(event)} />
                                                </span>
                                                :
                                                <span>
                                                    {index + 1} - {item.title}
                                                </span>
                                            }
                                        </>
                                    }
                                    <button className="edit"
                                        onClick={() => this.handleEditTodo(item)}>
                                        {isEmptyObj === false && editTodo.id === item.id ? 'Save' : 'Edit'}
                                    </button>
                                    <button className="delete"
                                        onClick={() => this.handleDeleteTodo(item)}>Delete</button>
                                </div>
                            )
                        })}

                </div>
            </div>
        );
    }
}