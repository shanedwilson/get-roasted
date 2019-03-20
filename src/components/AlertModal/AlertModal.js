import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class AlertModal extends React.Component {
  toggleAlertEvent = () => {
    const { toggleAlertModal } = this.props;
    toggleAlertModal();
  };

  render() {
    const { alertModal, alertId } = this.props;

    const makeAlert = () => {
      if (alertId === 'attempts') {
        return (
          <div className="text-center">
            <p>Please enter times in MM:SS format.</p>
          </div>
        );
      }
      return (
        <div className="text-center">
          <p>You already have this bean in your inventory.</p>
          <p>Please edit your existing stash.</p>
        </div>
      );
    };

    return (
      <div>
        <Modal isOpen={alertModal} toggle={this.toggleAlertEvent} className="modal-lg text-center">
          <ModalHeader toggle={this.toggleAlertEvent}>Yo!</ModalHeader>
          <ModalBody>
            {makeAlert()}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleAlertEvent}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AlertModal;
