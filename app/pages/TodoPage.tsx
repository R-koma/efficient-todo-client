"use client";

import React, { useRef } from "react";
import Todo from "../components/Todo";
import { TodoType } from "../types";
import { API_URL } from "@/constants/url";
import { useTodos } from "../hooks/useTodos";
import Link from "next/link";

const TodoPage = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { todos, isLoading, error, mutate } = useTodos();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch(`${API_URL}/createTodo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: inputRef.current?.value,
        isCompleted: false,
      }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      mutate([...todos, newTodo]);
      if (inputRef.current?.value) {
        inputRef.current.value = "";
      }
    }
  };
  return (
    <div className="max-w-md mx-auto bg-slate-800 shadow-lg rounded-lg overflow-hidden mt-32 py-4 px-4">
      <div className="px-4 py-2">
        <h1 className="text-gray-50 font-bold text-2xl uppercase">Todo List</h1>
      </div>
      <form
        className="w-full max-w-sm mx-auto px-4 py-2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center border-b-2 border-white-900 py-2">
          <input
            className="appearance-none bg-transparent
      border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight
      focus:outline-none"
            type="text"
            placeholder="Add a task"
            ref={inputRef}
          />
          <button
            className="duration-150 flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="divide-y divide-gray-200 px-4">
        {todos?.map((todo: TodoType) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
      {/* <Link href={`${API_URL}/allReviews`}>
        <a className="w-full text-purple-800 font-bold">☞ REVIEW LIST</a>
      </Link> */}
    </div>
  );
};

export default TodoPage;
