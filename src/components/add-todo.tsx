"use client"

import { FormEvent, useState } from "react";
import { useTodos } from "@/store/todos";

const AddTodo = () => {
    const [todo, setTodo] = useState("") // here todo is a string

    // calling the context for the handleAddTodo function
    const { handleAddTodo } = useTodos();

    const handleFormSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddTodo(todo);
        setTodo("");
    }

    return (
    <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Write your todo..."
        value={todo} onChange={(event) => setTodo(event.target.value)}/>
        <button type="submit"> ADD </button>
    </form>
  )
}

export default AddTodo
