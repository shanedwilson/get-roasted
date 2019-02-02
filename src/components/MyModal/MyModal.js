import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class MyModal extends React.Component {
  toggleEvent = () => {
    const { toggleModal } = this.props;
    toggleModal();
  }

  render() {
    const {
      makeForm,
      isEditing,
      modal,
      view,
    } = this.props;

    const makeHeadline = () => {
      if (isEditing === false) {
        return (
        <div className="mx-auto mt-3">
          <h5>Add {view}</h5>
        </div>
        );
      }
      return (
        <div className="mx-auto mt-3">
          <h5>Edit {view}</h5>
        </div>
      );
    };

    return (
      <div>
        <Modal isOpen={modal} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader toggle={this.toggleEvent}>{makeHeadline()}</ModalHeader>
          <ModalBody>
            {makeForm}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEvent}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
