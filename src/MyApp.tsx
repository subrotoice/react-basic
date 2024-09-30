import { useState } from "react";
import usePosts from "./react-query/hooks/usePosts";
import React from "react";
import TodoForm from "./react-query/TodoForm";
import PostForm from "./react-query/PostForm";

const MyApp = () => {
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage } = usePosts({ pageSize });
  console.log(data);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <PostForm />
      <ul className="list-group">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.id}
                {". "}
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button onClick={() => fetchNextPage()}>Load More</button>
    </>
  );
};

export default MyApp;
