import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class MyGraphModal extends React.Component {
  toggleEvent = () => {
    const { toggleGraph } = this.props;
    toggleGraph();
  }

  render() {
    const {
      makeGraph,
      graph,
    } = this.props;
    return (
      <div>
        <Modal isOpen={graph} toggle={this.toggleEvent} className="modal-lg">
          <ModalHeader toggle={this.toggleEvent}>Attempts Time vs Temperature</ModalHeader>
          <ModalBody>
            {makeGraph}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleEvent}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MyGraphModal;
