import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import axios from "axios";
import {getActiveUri} from "./utils/getActiveUri";
import {GET_POSTS} from "./utils/portList";

const App = () => {
  const [apiResponse, setApiResponse] = React.useState("");

  React.useEffect(() => {
   getActiveUri(GET_POSTS)
      .then((uri) => {
        axios.get(uri + '').then((res) => {
          setApiResponse(res.data);
        });
      })
      .catch((err) => {
        setApiResponse(err.message);
      });
  }, []);

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
