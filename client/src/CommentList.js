import React from "react";

const CommentList = ({ comments }) => {

  const renderedComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.comment}({comment.comment_status})</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;