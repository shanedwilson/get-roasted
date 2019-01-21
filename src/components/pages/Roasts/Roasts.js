import React from 'react';
import RoastCard from '../../RoastCard/RoastCard';
import smashDataRequests from '../../../helpers/data/smashDataRequests';
import authRequests from '../../../helpers/data/authRequests';

import './Roasts.scss';

class Roasts extends React.Component {
  state = {
    roastsSmash: [],
  }

  getRoasts = () => {
    const uid = authRequests.getCurrentUid();
    smashDataRequests.getRoastsWithBeanInfo(uid)
    .then((roastsSmash) => {
      this.setState({ roastsSmash });
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
   const { roastsSmash } = this.state;

    const roastCards = roastsSmash.map(roastSmash => (
      <RoastCard 
        key={roastSmash.id}
        roastSmash={roastSmash}
      />
    ));     

    return (
      <div className="Roasts mx-auto">
        <h1 className="text-center">ROASTS!!!</h1>
        <div className="row justify-content-center">
          {roastCards}
        </div>        
      </div>
    )
  }
}

export default Roasts;
