import React from 'react';
import RoastCard from '../../RoastCard/RoastCard';
import AddEditRoast from '../../AddEditRoast/AddEditRoast';
import smashDataRequests from '../../../helpers/data/smashDataRequests';
import authRequests from '../../../helpers/data/authRequests';
import beanRequests from '../../../helpers/data/beanRequests';
import roastRequests from '../../../helpers/data/roastRequests';

import './Roasts.scss';

class Roasts extends React.Component {
  state = {
    roastsSmash: [],
    beans: [],
  }

  getRoasts = () => {
    const uid = authRequests.getCurrentUid();
    smashDataRequests.getRoastsWithBeanInfo(uid)
    .then((roastsSmash) => {
      this.setState({ roastsSmash });
    })
  };

  getAllBeans = () => {
    beanRequests.getAllBeans()
    .then((beans) => {
      this.setState({ beans });
    })
  }  

  changeView = (e) => {
    const roastId = e.target.id;
    this.props.history.push(`/attempts/${roastId}`);
  }

  componentDidMount() {
    this.getRoasts();
    this.getAllBeans();
  }

  deleteSingleRoast = (roastId) => {
    roastRequests.deleteRoast(roastId)
      .then(() => {
        this.getRoasts();
      });
  } 

  attemptsView = (roastId) => {
    this.props.history.push(`/attempts/${roastId}`);
  }

  render() {
    const { roastsSmash, beans } = this.state;
    const uid = authRequests.getCurrentUid();
    const ownerUid = 'EYSoFrK8TzeUwtPdw7UwAP9KjVb2';

    const roastCards = roastsSmash.map(roastSmash => (
      <RoastCard 
        key={roastSmash.id}
        roastSmash={roastSmash}
        uid={uid}
        ownerUid={ownerUid}
        onSelect={this.attemptsView}
        deleteSingleRoast={this.deleteSingleRoast}
      />
    ));     

    return (
      <div className="Roasts mx-auto">
        <h1 className="text-center">ROASTS!!!</h1>
        <div><AddEditRoast beans={beans} /></div>
        <div className="row justify-content-center">
          {roastCards}
        </div>        
      </div>
    )
  }
}

export default Roasts;
