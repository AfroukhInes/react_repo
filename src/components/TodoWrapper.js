import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { supabase } from './supabaseClient';
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true });
    if (error) console.log('Error fetching todos:', error);
    else setTodos(data);
  };

  const addTodo = async (todo) => {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ task: todo, completed: false }])
      .select();
    if (error) console.log('Error adding todo:', error);
    else setTodos([...todos, data[0]]);
  };

  const deleteTodo = async (id) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id);
    if (error) console.log('Error deleting todo:', error);
    else setTodos(todos.filter((todo) => todo.id !== id));
  }

  const toggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const { error } = await supabase
      .from('todos')
      .update({ completed: !todoToUpdate.completed })
      .eq('id', id);
    if (error) console.log('Error updating todo:', error);
    else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    }
  }
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }


  const editTask = async (task, id) => {
    const { error } = await supabase
      .from('todos')
      .update({ task: task })
      .eq('id', id);
    if (error) {
      console.log('Error updating todo:', error);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: false } : todo
        )
      );
    }
  };


  return (
    <div className="TodoWrapper">
      <h1>Todo List!</h1>
      <TodoForm addTodo={addTodo} />
      {/* display todos */}
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};