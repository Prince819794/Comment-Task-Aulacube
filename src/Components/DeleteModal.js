import "./Styles/DeleteModal.scss";

const DeleteModal = ({ setDeleting, deleteComment, setDeleteModalState }) => {
  const cancelDelete = () => {
    setDeleting(false);
    setDeleteModalState(false);
  };

  const deleteBtnClick = () => {
    deleteComment();
    setDeleteModalState(false);
  };

  return (
    <div className="delete-confirmation-wrapper">
      <div className="delete-container">
        <div className="title">Delete comment</div>
        <div className="confirmation-message">Are you sure?</div>
        <div className="btn-container">
          <button className="cancel-btn" onClick={cancelDelete}>Cancel</button>
          <button className="delete-btn" onClick={deleteBtnClick}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
