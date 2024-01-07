import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <div className="container">
      <h1>Nouvel article</h1>
      <PostCreate />
      <hr />
      <h1>Articles</h1>
      <PostList />
    </div>
  );
};
export default App;