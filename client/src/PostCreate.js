import React, { useState } from "react";
import axios from "axios";
import {getActiveUri} from "./utils/getActiveUri";
import {CREATE_POST} from "./utils/portList";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      getActiveUri(CREATE_POST)
        .then((uri) => {
          console.log(uri)
          axios.post(uri + '/posts', {
            title,
          });
        })
    } catch (err) {
      console.log(err);
    }


    setTitle("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Titre</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Publier</button>
      </form>
    </div>
  );
};

export default PostCreate;