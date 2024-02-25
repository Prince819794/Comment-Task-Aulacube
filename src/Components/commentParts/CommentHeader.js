import { useState, useEffect } from "react";

import { commentPostedTime } from "../../utils";

const CommentHeader = ({
  commentData,
  replying,
  setReplying,
  setDeleting,
  setDeleteModalState,
  setEditing,
}) => {
  const [time, setTime] = useState("");
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const differenceInTime = today.getTime() - createdAt.getTime();
      setTime(commentPostedTime(differenceInTime));
    }, 1000);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="comment--header">
      <div className={`profile-pic ${commentData.username}`}></div>
      <div className="username">{commentData.username}</div>
      <div className="comment-posted-time">{`${time} ago`}</div>
    </div>
  );
};

export default CommentHeader;
