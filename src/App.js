import { useState, useEffect } from "react";
import "./Components/Styles/App.scss";
import Comment from "./Components/Comment";
import AddComment from "./Components/AddComment";

const App = () => {
  const [comments, updateComments] = useState([]);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [sortOrder, setSortOrder] = useState({ criteria: "old", order: "ascending" });

  const toggleSortOrder = () => setSortOrder(prevSortOrder => ({ ...prevSortOrder, order: prevSortOrder.order === "ascending" ? "descending" : "ascending" }));

  const getData = async () => {
    const res = await fetch("./data/data.json");
    const data = await res.json();
    updateComments(data.comments);
  };

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    storedComments ? updateComments(JSON.parse(storedComments)) : getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
    document.body.classList.toggle("overflow--hidden", deleteModalState);
  }, [comments, deleteModalState]);

  const addComments = newComment => updateComments([...comments, newComment]);

  const updateReplies = (replies, id) => updateComments(comments.map(comment => comment.id === id ? { ...comment, replies: [...replies] } : comment));

  const editComment = (content, id, type) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === id) {
        if (type === "comment") return { ...comment, content };
        else if (type === "reply") return { ...comment, replies: comment.replies.map(reply => reply.id === id ? { ...reply, content } : reply) };
      }
      return comment;
    });
    updateComments(updatedComments);
  };

  const commentDelete = (id, type, parentComment) => {
    let updatedComments = [...comments];
    if (type === "comment") updatedComments = updatedComments.filter(data => data.id !== id);
    else if (type === "reply") updatedComments = updatedComments.map(comment => comment.id === parentComment ? { ...comment, replies: comment.replies.filter(data => data.id !== id) } : comment);
    updateComments(updatedComments);
  };

  const sortedComments = [...comments].sort((a, b) => {
    const comparison = sortOrder.criteria === "newest" ? new Date(b.createdAt) - new Date(a.createdAt) : new Date(a.createdAt) - new Date(b.createdAt);
    return sortOrder.order === "descending" ? -comparison : comparison;
  });

  return (
    <main className="App">
      <div className="btn-div">
        <button onClick={toggleSortOrder}>{sortOrder.order === "ascending" ? "Latest Last" : "Latest First"}</button>
      </div>
      {sortedComments.map(comment => (
        <Comment
          key={comment.id}
          commentData={comment}
          updateReplies={updateReplies}
          editComment={editComment}
          commentDelete={commentDelete}
          setDeleteModalState={setDeleteModalState}
        />
      ))}
      <AddComment buttonValue={"send"} addComments={addComments} />
    </main>
  );
};

export default App;
