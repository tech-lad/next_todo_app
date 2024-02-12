"use client"

import { useTodos } from "@/store/todos";
import { useSearchParams } from 'next/navigation'

const Todos = () => {
    const { todos, toggleTodoAsCompleted, handleTodoDelete } = useTodos();
    const searchParams = useSearchParams();
    const todosParams = searchParams.get('todos');

    let filterTodos = todos;

    if(todosParams === "active"){
        filterTodos = filterTodos.filter((todo) => !todo.completed);
    }else if(todosParams === "completed"){
        filterTodos = filterTodos.filter((todo) => todo.completed)
    }

    return (
        <ul>
            {
                filterTodos.map((todo) => {
                    return <li key={todo.id}>
                        {
                            <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)}></input>
                        }

                        <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

                        {
                            todo.completed && (
                                <button type="button" onClick={() => handleTodoDelete(todo.id)}> Delete </button>
                            )
                        }

                    </li>
                })
            }
        </ul>
    )
}

export default Todos;
