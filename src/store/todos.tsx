"use client"

import {ReactNode, createContext, useContext, useState} from 'react';

export type Todo = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
}

export type TodosContext = {
    todos: Todo[];
    handleAddTodo: (task:string) => void   // this is called "call signature"
}

export const todosContext = createContext <TodosContext | null> (null);

export const TodosProvider = ({children}: {children: ReactNode}) => {

    const [todos, setTodos] = useState<Todo[]>([])

    const handleAddTodo = (task: string) => {
        setTodos((prev: Todo[]) => {
            const newTodos: Todo[] = [{
                id: Math.random().toString(),
                task: task,
                completed: false,
                createdAt: new Date()
            }, ...prev]
            return newTodos;
        })
    }
    return (
        <todosContext.Provider value={{todos, handleAddTodo}}>
            {children}
        </todosContext.Provider>
    )
}

// function for using the context "todosContext"
// we just build the function of calling the useContext hook here and call the function below whenever needed in another program
export function useTodos () : TodosContext {
    const todosContextValue = useContext(todosContext);
    if(!todosContextValue){
        throw new Error("useTodos used outside the Provider")
    }
    return todosContextValue;
}