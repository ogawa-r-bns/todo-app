'use client';

import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]); // To-Doリストの状態

  // ローカルストレージからTo-Doリストを取得
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // To-Doリストをローカルストレージに保存
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
      return;
    }
    localStorage.removeItem("todos");
  }, [todos]);

  // To-Doの追加
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    const input = ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
    if (input.trim() === "") return; // 空文字のTo-Doは追加しない

    const newTodo: Todo = {
      id: Date.now(), // ユニークなIDを生成
      text: input,
      completed: false, // 初期状態は未完了
    };

    setTodos([...todos, newTodo]); // 新しいTo-Doをリストに追加
    (e.target as HTMLFormElement).reset();
  };

  // To-Doの削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)); // IDが一致するTo-Doを削除
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">To-Doリスト</h1>

      <form onSubmit={addTodo} className="flex mb-6">
        <input
          type="text"
          placeholder="新しいTo-Doを追加"
          className="p-2 w-full border rounded-l-md"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-r-md cursor-pointer"
        >
          追加
        </button>
      </form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mr-3"
              />
              <span
                className={`${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
