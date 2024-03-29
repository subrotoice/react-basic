import React from "react";
import PostList from "./react-query/PostList";
import TodoForm from "./react-query/TodoForm";
import TodoList from "./react-query/TodoList";
import DataFetch from "./custom-hook/DataFetch";

const AppReactQuery = () => {
  return (
    <div>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default AppReactQuery;
