'use client';

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]); // To-Doリストの状態

  // To-Doの追加
  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    const input = ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
    if (input.trim() === "") return; // 空文字のTo-Doは追加しない

    const newTodo: Todo = {
      id: Date.now(), // ユニークなIDを生成
      text: input,
    };

    setTodos([...todos, newTodo]); // 新しいTo-Doをリストに追加
    (e.target as HTMLFormElement).reset();
  };

  // To-Doの削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id)); // IDが一致するTo-Doを削除
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>To-Doリスト</h1>

      {/* To-Do入力フォーム */}
      <form onSubmit={addTodo} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="新しいTo-Doを追加"
          style={{ padding: "10px", width: "300px", marginRight: "10px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          追加
        </button>
      </form>

      {/* To-Doリストの表示 */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <span>{todo.text}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                marginLeft: "10px",
                padding: "5px 10px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
