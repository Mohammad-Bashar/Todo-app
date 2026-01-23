import React, { useEffect, useState } from "react";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Home() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  //fetch data from db
  useEffect(() => {
    const fetchtodos = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:4001/todo/fetch", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data.todos);
        setTodos(response.data.todos);
        setError(null);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchtodos();
  }, []);

  //create new task
  const todoCreate = async () => {
    if (!newTodo) return;
    try {
      const response = await axios.post(
        "http://localhost:4001/todo/create",
        {
          text: newTodo,
          completed: false,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newTodo);
      setTodos([...todos, response.data.newTodo]);
      setNewTodo("");
    } catch (error) {
      setError("Failed to create todo");
    }
  };

  //update the task
  const todoStatus = async (id) => {
    const todo = todos.find((t) => t._id === id);
    try {
      const response = await axios.put(
        `http://localhost:4001/todo/update/${id}`,
        {
          ...todo,
          completed: !todo.completed,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.todo);
      setTodos(todos.map((t) => (t._id === id ? response.data.todo : t)));
    } catch (error) {
      setError("Failed to find todo status");
    }
  };

  //delete the task
  const todoDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/todo/delete/${id}`, {
        withCredentials: true,
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      setError("Failed to Delete Todo");
    }
  };

  const navigateTo = useNavigate();
  //logout user
  const logout = async () => {
    try {
      await axios.get("http://localhost:4001/user/logout", {
        withCredentials: true,
      });
      toast.success("User logged out successfully");
      navigateTo("/login");
      localStorage.removeItem("jwt");
    } catch (error) {
      toast.error("Error logging out");
    }
  };
//show remaining tasks
  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    < >
    <div className="my-10 bg-[#7EA172] max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6">
  <h1 className="text-2xl pb-4 text-Black text-l font-semibold text-center">
    Task Management App
  </h1>

  <div className="flex mb-4">
    <input
      type="text"
      placeholder="Add a new todo"
      value={newTodo}
      onChange={(e) => setNewTodo(e.target.value)}
      onKeyPress={(e) => e.key === "Enter" && todoCreate()}
      className="flex-grow p-2 border border-[#C7CB85] rounded-l-md focus:outline-none bg-white"
    />
    <button
      onClick={todoCreate}
      className="bg-[#C7CB85] border border-[#C7CB85] rounded-r-md text-gray-900 px-4 py-2 hover:bg-[#b7bc75] duration-300"
    >
      Add
    </button>
  </div>

  {loading ? (
    <div className="text-center justify-center">
      <span className="text-black text-xl">Loading...</span>
    </div>
  ) : error ? (
    <div className="text-center text-red-200 font-semibold">{error}</div>
  ) : (
    <ul className="space-y-2">
      {todos.map((todo, index) => (
        <li
          key={todo._id || index}
          className="flex items-center justify-between p-3 bg-[#C7CB85] rounded-md"
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => todoStatus(todo._id)}
              className="mr-2 accent-[#7EA172]"
            />
            <span
              className={`${
                todo.completed
                  ? "line-through text-gray-700 font-semibold"
                  : "text-gray-900"
              }`}
            >
              {todo.text}
            </span>
          </div>

          <button
            onClick={() => todoDelete(todo._id)}
            className="text-red-700 hover:text-red-900 duration-300"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )}

  <p className="mt-4 text-center text-m text-black">
    {remainingTodos} remaining tasks
  </p>

  <button
    onClick={() => logout()}
    className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block"
  >
    Logout
  </button>
</div>
</>
  );
}

export default Home;
