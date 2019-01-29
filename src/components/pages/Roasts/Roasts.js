import React from 'react';
import SearchField from 'react-search-field';
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
    filteredRoasts: [],
    isEditing: false,
    editId: '',
    beanId: '',
  }

  setBeanId = () => {
    const firebaseId = this.props.match.params.id;
    this.setState({ beanId: firebaseId });
  }

  getRoasts = () => {
    const uid = authRequests.getCurrentUid();
    smashDataRequests.getRoastsWithBeanInfo(uid)
      .then((roasts) => {
        this.setState({ roasts });
        this.setState({ filteredRoasts: roasts });
      });
  };

  getAllBeans = () => {
    beanRequests.getAllBeans()
      .then((beans) => {
        this.setState({ beans });
      });
  }

  changeView = (roastId) => {
    this.props.history.push(`/attempts/${roastId}`);
  }

  onChange = (value, event) => {
    const { roasts } = this.state;
    const filteredRoasts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredRoasts: roasts });
    } else {
      roasts.forEach((roast) => {
        if (roast.name.toLowerCase().includes(value.toLowerCase())
        || roast.roastName.toLowerCase().includes(value.toLowerCase())
        || roast.region.toLowerCase().includes(value.toLowerCase())) {
          filteredRoasts.push(roast);
        }
        this.setState({ filteredRoasts });
      });
    }
  }

  componentDidMount() {
    this.getRoasts();
    this.getAllBeans();
    this.setBeanId();
  }

  deleteSingleRoast = (roastId) => {
    roastRequests.deleteRoast(roastId)
      .then(() => {
        this.getRoasts();
      });
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
      filteredRoasts,
      beans,
      isEditing,
      editId,
      beanId,
      roasts,
    } = this.state;

    const uid = authRequests.getCurrentUid();
    const ownerUid = 'EYSoFrK8TzeUwtPdw7UwAP9KjVb2';

    const roastCards = filteredRoasts.map(roast => (
      <RoastCard
        key={roast.id}
        roast={roast}
        uid={uid}
        ownerUid={ownerUid}
        beanId={beanId}
        onSelect={this.changeView}
        deleteSingleRoast={this.deleteSingleRoast}
        passRoastToEdit={this.passRoastToEdit}
        roasts={roasts}
      />
    ));

    return (
      <div className="Roasts mx-auto">
        <h1 className="text-center mt-5">ROASTS!!!</h1>
          <SearchField
            placeholder="Search Roasts By Region, Roast Name or Bean Name..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-100"
          />
        <div>
          <AddEditRoast
            beans={beans}
            isEditing={isEditing}
            onSubmit={this.formSubmitEvent}
            editId={editId}
            beanId={beanId}
            setSelect={this.setSelect}
        />
      </div>
        <div className="rst-cards row justify-content-center">
          {roastCards}
        </div>
      </div>
    );
  }
}

export default Roasts;
