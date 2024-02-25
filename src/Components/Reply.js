import { useState } from "react";
import "./Styles/Comment.scss";
import AddComment from "./AddComment";
import DeleteModal from "./DeleteModal";
import CommentBtn from "./commentParts/CommentBtn";
import { CommentHeader, CommentFooter } from "./commentParts";

const Reply = ({
  commentData,
  updateScore,
  addNewReply,
  editComment,
  deleteComment,
  setDeleteModalState,
}) => {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  const addReply = (newReply) => {
    addNewReply(newReply);
    setReplying(false);
  };

  const commentContent = () => {
    const text = commentData.content.trim().split(" ");
    const firstWord = text.shift().split(",");

    return !editing ? (
      <div className="comment-content">
        <span className="replyingTo">{firstWord}</span>
        {text.join(" ")}
      </div>
    ) : (
      <textarea
        className="content-edit-box"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    );
  };

  const updateComment = () => {
    editComment(content, commentData.id, "reply");
    setEditing(false);
  };

  const deleteReply = () => {
    deleteComment(commentData.id, "reply");
    setDeleting(false);
  };

  return (
    <div className={`comment-container ${commentData.replies[0] ? "gap" : ""}`}>
      <div className="comment">
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
          />
          {commentContent()}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
          <CommentBtn
            commentData={commentData}
            replying={replying}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
          />
        </div>
        <CommentFooter
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
          type="reply"
        />
      </div>
      {replying && (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.username}
        />
      )}
      {commentData.replies.map((reply) => (
        <Reply
          key={reply.id}
          commentData={reply}
          addNewReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      ))}
      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteReply}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default Reply;
