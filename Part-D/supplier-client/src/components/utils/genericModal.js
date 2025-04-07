import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function GenericModal({ show, handleClose, title, body, footer }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{body}</Modal.Body>

      <Modal.Footer>
        {footer ? footer : <Button onClick={handleClose}>Close</Button>}
      </Modal.Footer>
    </Modal>
  );
}

export default GenericModal;
