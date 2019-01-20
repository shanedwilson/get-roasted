import React from 'react';

import './Roasts.scss';

class Roasts extends React.Component {
  changeView = (e) => {
    const roastId = e.target.id;
    this.props.history.push(`/attempts/${roastId}`);
  }

  render() {
    return (
      <div className="Roasts mx-auto">
        <h1>ROASTS!!!</h1>
        <button className="btn btn-success" id="12345" onClick={this.changeView}>Go To Attempts</button>
      </div>
    )
  }
}

export default Roasts;
