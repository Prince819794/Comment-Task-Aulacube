import { useState } from "react";
import "./Styles/Comment.scss";
import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";
import DeleteModal from "./DeleteModal";
import { CommentHeader, CommentFooter } from "./commentParts";

const Comment = ({ commentData, updateScore, updateReplies, editComment, commentDelete, setDeleteModalState }) => {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  const addReply = newReply => {
    if (commentData.replies.length < 2) {
      updateReplies([...commentData.replies, newReply], commentData.id);
      setReplying(false);
    } else {
      alert("Can't add more than 2 replies to a comment");
    }
  };

  const updateComment = () => {
    editComment(content, commentData.id, "comment");
    setEditing(false);
  };

  const deleteComment = (id, type) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : commentData.id;
    commentDelete(finalId, finalType, commentData.id);
    setDeleting(false);
  };

  return (
    <div className={`comment-container ${commentData.replies[0] !== undefined ? "reply-container-gap" : ""}`}>
      <div className="comment">
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            replying={replying}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setDeleteModalState={setDeleteModalState}
            setEditing={setEditing}
          />
          {!editing ? (
            <div className="comment-content">{commentData.content}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>update</button>
          )}
        </div>
        <CommentFooter
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setDeleteModalState={setDeleteModalState}
          setEditing={setEditing}
          type="comment"
        />
      </div>

      {replying && (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.username}
        />
      )}
      {commentData.replies.length > 0 && (
        <ReplyContainer
          key={commentData.replies.id}
          commentData={commentData.replies}
          updateScore={updateScore}
          addReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}

      {deleting && (
        <DeleteModal
          setDeleting={setDeleting}
          deleteComment={deleteComment}
          setDeleteModalState={setDeleteModalState}
        />
      )}
    </div>
  );
};

export default Comment;
