
export const Note = (props) => {
  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this note?")) {
      props.deleteNote(props.id);
    }
  };

  const handleClick = () => {
    props.showNoteModal();
  };

  return (
    <div className="Note" onClick={handleClick}>
      <div className="noteHeader">
        <span className="noteTitle">{props.title}</span>
        <div className="title">
          <span className="spanDate">{props.formattedDate}</span>
          {props.updatedDate && (
            <span className="spanUpdateDate">Updated: {props.updatedDate}</span>
          )}
          <span className="buttonDelete" onClick={handleDelete}>
            x
          </span>
        </div>
      </div>
      <div className="container">{props.noteName}</div>
    </div>
  );
};

export default Note;
