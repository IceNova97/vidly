import React from "react";

const Like = (props) => {
  const { liked, onClick } = props;
  const classess = liked ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      className={classess}
      aira-hidden="true"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
