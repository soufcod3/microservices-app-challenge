import React, { useState } from "react";
import axios from "axios";
import {getActiveUri} from "./utils/getActiveUri";
import {CREATE_COMMENT} from "./utils/portList";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    getActiveUri(CREATE_COMMENT)
      .then( async (uri) => {
        await axios.post(uri + `/posts/${postId}/comments`, {
          content,
        });
        setContent("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Nouveau commentaire</label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Publier</button>
      </form>
    </div>
  );
};

export default CommentCreate;
