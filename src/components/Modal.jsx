import { useState } from "react";
import { Modal } from "react-bootstrap";

export function MyVerticallyCenteredModal({
  show,
  onHide,
  selectedNote,
  onUpdateNote,
}) {
  const closeModal = () => {
    onHide();
  };

  const [editedNote, setEditedNote] = useState({
    title: selectedNote ? selectedNote.title : "",
    noteName: selectedNote ? selectedNote.noteName : "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdateNote(selectedNote.id, {
      ...editedNote,
      updatedDate: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    });
    closeModal();
  };

  return (
    <Modal
      show={show}
      onHide={closeModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="noteHeaderModal">
          <span className="spanDateModal">
            {selectedNote ? selectedNote.formattedDate : ""}
          </span>
          <span className="buttonDeleteModal" onClick={closeModal}>
            x
          </span>
        </div>
        <div className="modalContainer">
          <input
            onChange={handleChange}
            className="textAreaTitle"
            placeholder="Title"
            name="title"
            value={editedNote.title}
          />
          <textarea
            onChange={handleChange}
            className="textArea"
            placeholder="Enter a Note ..."
            name="noteName"
            value={editedNote.noteName}
          ></textarea>
          <button
            onClick={handleUpdate}
            className="updateButton"
            disabled={editedNote.noteName.trim() === ""}
          >
            Update Note
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
