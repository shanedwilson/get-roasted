import React from 'react';
import roastRequests from '../../../helpers/data/roastRequests'
import authRequests from '../../../helpers/data/authRequests';

import './Roasts.scss';

class Roasts extends React.Component {
  state = {
    beans: [],
  }

  getRoasts = () => {
    const uid = authRequests.getCurrentUid();
    roastRequests.getAllRoasts(uid)
    .then((roasts) => {
      this.setState({ roasts });
    })
  };

  changeView = (e) => {
    const roastId = e.target.id;
    this.props.history.push(`/attempts/${roastId}`);
  }

  componentDidMount() {
    this.getRoasts();
  }   

  render() {
    console.log(this.state.roasts);

    return (
      <div className="Roasts mx-auto">
        <h1>ROASTS!!!</h1>
        <button className="btn btn-success" id="12345" onClick={this.changeView}>Go To Attempts</button>
      </div>
    )
  }
}

export default Roasts;
