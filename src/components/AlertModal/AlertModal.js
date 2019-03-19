import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class MyModal extends React.Component {
  toggleAlertEvent = () => {
    const { toggleAlertModal } = this.props;
    toggleAlertModal();
  };

  render() {
    const { alertModal } = this.props;

    return (
      <div>
        <Modal isOpen={alertModal} toggle={this.toggleAlertEvent} className="modal-lg text-center">
          <ModalHeader toggle={this.toggleFactEvent}>Yo!</ModalHeader>
          <ModalBody>
          <div className="text-center">
            <p>You already have this bean in your inventory.</p>
            <p>Please edit your existing stash.</p>
          </div>          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleAlertEvent}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyModal;
