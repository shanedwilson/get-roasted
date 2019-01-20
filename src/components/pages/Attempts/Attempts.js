import React from 'react';

import './Attempts.scss';

class Attempts extends React.Component {
  addView = (e) => {
    const attemptId = e.target.id;
    this.props.history.push(`/attempts/${attemptId}/add`);
  }  

  editView = (e) => {
    const attemptId = e.target.id;
    this.props.history.push(`/attempts/${attemptId}/edit`);
  } 

  render() {
    return (
      <div className="Attempts mx-auto">
        <h1>ATTEMPTS!!!</h1>
        <button className="btn btn-success" id="13579" onClick={this.addView}>Go To Attempts Add</button>
        <button className="btn btn-primary" id="246810" onClick={this.editView}>Go To Attempts Edit</button>
      </div>
    )
  }
}

export default Attempts;
