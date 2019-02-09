import React from 'react';
// import PropTypes from 'prop-types';
import factsRequests from '../../helpers/data/factsRequests';

import './Facts.scss';

class Facts extends React.Component {
  state = {
    fact: [],
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

  getFacts = () => {
    factsRequests.getAllFacts()
      .then((facts) => {
        this.setState({ facts });
      });
  };

  componentDidMount() {
    this.getFact();
  }

  render() {
    const { fact } = this.state;

    const factCards = (
       <div className="card roast-card col-3 m-3 rounded">
          <div className="card-header roast-card-header mt-3 h-25 text-center d-flex rounded">
            <h5 className="card-title mx-auto m-0">{fact.title}</h5>
          </div>
          <div className="card-body d-flex flex-column text-center justify-content-center">
            <p className="card-text lead">{fact.text}</p>
          </div>
        </div>
    );

    return (
      <div>
        {factCards}
      </div>
    );
  }
}

export default Facts;
