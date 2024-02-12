"use client"

import { ReactNode, createContext, useContext, useState } from 'react';

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];    // so it is an array of Todo type
    handleAddTodo: (task: string) => void;   // this is called "call signature"
    toggleTodoAsCompleted: (id: string) => void;
    handleTodoDelete: (id: string) => void;
}

export const todosContext = createContext<TodosContext | null>(null);



export const TodosProvider = ({ children }: { children: ReactNode }) => {



    const [todos, setTodos] = useState<Todo[]>(() => {
        if (typeof window !== 'undefined') {
            // Perform localStorage action
            const initialTodos = localStorage.getItem('todos') || "[]"
            return JSON.parse(initialTodos);
        }
    })

    const handleAddTodo = (task: string) => {
        setTodos((prev: Todo[]) => {
            const newTodos: Todo[] = [{
                id: Math.random().toString(),
                task: task,
                completed: false,
                createdAt: new Date()
            }, ...prev]
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    // if the task is completed

    const toggleTodoAsCompleted = (id: string) => {
        setTodos((prev: Todo[]) => {
            const newTodos = prev.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed }
                }
                return task;
            })
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    // if task is Deleted
    const handleTodoDelete = (id: string) => {
        setTodos((prev: Todo[]) => {
            const newTodos = prev.filter((task) => {
                return task.id !== id
            }
            )
            localStorage.setItem("todos", JSON.stringify(newTodos));
            return newTodos;
        })
    }

    return (
        <todosContext.Provider value={{ todos, handleAddTodo, toggleTodoAsCompleted, handleTodoDelete }}>
            {children}
        </todosContext.Provider>
    )
}

// function for using the context "todosContext"
// we just build the function of calling the useContext hook here and call the function below whenever needed in another program
export function useTodos(): TodosContext {
    const todosContextValue = useContext(todosContext);
    if (!todosContextValue) {
        throw new Error("useTodos used outside the Provider")
    }
    return todosContextValue;
}