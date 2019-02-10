import React from 'react';
// import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import factsRequests from '../../helpers/data/factsRequests';

import './Facts.scss';

class Facts extends React.Component {
  state = {
    fact: [],
  }

  toggleFactEvent = () => {
    const { toggleFactModal } = this.props;
    toggleFactModal();
  }

  getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  getFact = () => {
    factsRequests.getAllFacts()
      .then((facts) => {
        const min = 0;
        const max = facts.length - 1;
        const i = Math.round(this.getRandomNumber(min, max));
        this.setState({ fact: facts[i] });
      });
  }

  toggleFactEvent = () => {
    const { toggleFactModal } = this.props;
    toggleFactModal();
    this.getFact();
  }

  componentDidMount() {
    this.getFact();
  }

  render() {
    const { fact } = this.state;
    const { factModal } = this.props;

    return (
      <div>
        <Modal isOpen={factModal} toggle={this.toggleFactEvent} className="modal-lg">
          <ModalHeader toggle={this.toggleFactEvent}>{fact.title}</ModalHeader>
          <ModalBody>
          <div className="text-center">
            <p>{fact.text}</p>
          </div>          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleFactEvent}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Facts;
