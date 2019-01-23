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
    roasts: [],
    beans: [],
    isEditing: false,
    editId: '',
    beanId: '',
  }

  getRoasts = () => {
    const uid = authRequests.getCurrentUid();
    smashDataRequests.getRoastsWithBeanInfo(uid)
      .then((roasts) => {
        this.setState({ roasts });
      });
  };

  getAllBeans = () => {
    beanRequests.getAllBeans()
      .then((beans) => {
        this.setState({ beans });
      });
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

  passRoastToEdit = (roastId, beanId) => {
    this.setState({ isEditing: true, editId: roastId, beanId });
  }

  setSelect = (selectedBean) => {
    this.setState({ beanId: selectedBean });
  }

  formSubmitEvent = (newRoast) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      roastRequests.updateRoast(editId, newRoast)
        .then(() => {
          this.getRoasts();
          this.setState({ isEditing: false });
          this.setState({ beanId: '' });
        });
    } else {
      roastRequests.createRoast(newRoast)
        .then(() => {
          this.getRoasts();
          this.setState({ beanId: '' });
        });
    }
  }

  render() {
    const {
      roasts,
      beans,
      isEditing,
      editId,
      beanId,
    } = this.state;

    const uid = authRequests.getCurrentUid();
    const ownerUid = 'EYSoFrK8TzeUwtPdw7UwAP9KjVb2';

    const roastCards = roasts.map(roast => (
      <RoastCard
        key={roast.id}
        roast={roast}
        uid={uid}
        ownerUid={ownerUid}
        beanId={beanId}
        onSelect={this.attemptsView}
        deleteSingleRoast={this.deleteSingleRoast}
        passRoastToEdit={this.passRoastToEdit}
      />
    ));

    return (
      <div className="Roasts mx-auto">
        <h1 className="text-center">ROASTS!!!</h1>
        <div><AddEditRoast
        beans={beans}
        isEditing={isEditing}
        onSubmit={this.formSubmitEvent}
        editId={editId}
        beanId={beanId}
        setSelect={this.setSelect}
        />
      </div>
        <div className="row justify-content-center">
          {roastCards}
        </div>
      </div>
    );
  }
}

export default Roasts;
