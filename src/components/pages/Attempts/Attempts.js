import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import SearchField from 'react-search-field';
import Facts from '../../Facts/Facts';
import MyModal from '../../MyModal/MyModal';
import MyGraphModal from '../../../MyGraphModal/MyGraphModal';
import AddAttempts from '../AddAttempts/AddAttempts';
import AttemptCard from '../../AttemptCard/AttemptCard';
import AttemptsGraph from '../../AttemptsGraph/AttemptsGraph';
import attemptsRequests from '../../../helpers/data/attemptsRequests';
import authRequests from '../../../helpers/data/authRequests';
import roastRequests from '../../../helpers/data/roastRequests';
import beanRequests from '../../../helpers/data/beanRequests';


import './Attempts.scss';

class Attempts extends React.Component {
  state = {
    attempts: [],
    filteredAttempts: [],
    weather: [],
    roast: [],
    bean: [],
    firstCrack: [],
    secondCrack: [],
    end: [],
    modal: false,
    isEditing: false,
    editId: '',
    roastId: '',
    view: 'Attempts',
    isSearching: false,
    graph: false,
    factModal: false,
  }

  toggleModal = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  }

  toggleGraph = () => {
    const { graph } = this.state;
    this.setState({
      graph: !graph,
    });
  }

  toggleSearch = () => {
    const { isSearching, attempts } = this.state;
    this.setState({ isSearching: !isSearching, filteredAttempts: attempts });
  }

  toggleFactModal = () => {
    const { factModal } = this.state;
    this.setState({
      factModal: !factModal,
    });
  }

  onEnter = () => {
    const { attempts } = this.state;
    this.setState({ isSearching: false, filteredAttempts: attempts });
  }

  onSearchClick = () => {
    const { attempts } = this.state;
    this.setState({ isSearching: false, filteredAttempts: attempts });
  }

  getRoastId = () => {
    const roastId = this.props.match.params.id;
    this.setState({ roastId });
  }

  getBean = (beanId) => {
    beanRequests.getSingleBean(beanId)
      .then((bean) => {
        this.setState({ bean: bean.data });
      })
      .catch((error) => {
        console.error('error with single bean GET', error);
      });
  }

  getRoast = () => {
    const firebaseId = this.props.match.params.id;
    roastRequests.getSingleRoast(firebaseId)
      .then((roast) => {
        this.setState({ roast: roast.data });
        this.getBean(roast.data.beanId);
      })
      .catch((error) => {
        console.error('error with single roast GET', error);
      });
  }

  timeConversion = (time) => {
    const timeSplit = time.split(':');
    let convertedTime = parseInt(timeSplit[0], 10) + (parseInt(timeSplit[1], 10) / 60);
    convertedTime = convertedTime.toFixed(2);
    return (convertedTime);
  }

  graphData = () => {
    const { attempts } = this.state;
    const firstCrack = [];
    const secondCrack = [];
    const end = [];
    attempts.forEach((attempt) => {
      firstCrack.push({
        time: this.timeConversion(attempt.firstTime),
        temp: attempt.firstTemp,
        rating: attempt.rating,
      });
      secondCrack.push({
        time: this.timeConversion(attempt.secondTime),
        temp: attempt.secondTemp,
        rating: attempt.rating,
      });
      end.push({
        time: this.timeConversion(attempt.endTime),
        temp: attempt.endTemp,
        rating: attempt.rating,
      });
    });
    this.setState({ firstCrack, secondCrack, end });
  }

  getAttempts = () => {
    const uid = authRequests.getCurrentUid();
    const firebaseId = this.props.match.params.id;
    const firstCrack = [];
    const secondCrack = [];
    const end = [];
    attemptsRequests.getAllAttemptsByUid(uid, firebaseId)
      .then((attempts) => {
        this.setState({
          attempts, filteredAttempts: attempts, firstCrack, secondCrack, end,
        });
        this.graphData();
      })
      .catch((error) => {
        console.error('error with attempts GET', error);
      });
  };

  addView = () => {
    const roastId = this.props.match.params.id;
    this.props.history.push(`/attempts/${roastId}/add`);
  }

  onChange = (value, event) => {
    const { attempts } = this.state;
    const filteredAttempts = [];
    event.preventDefault();
    if (!value) {
      this.setState({ filteredAttempts: attempts });
    } else {
      attempts.forEach((attempt) => {
        const displayTime = moment(attempt.date).format('MMM DD YYYY hh:mm a');
        if (displayTime.toLowerCase().includes(value.toLowerCase())) {
          filteredAttempts.push(attempt);
        }
        this.setState({ filteredAttempts });
      });
    }
  }

  componentDidMount() {
    this.getAttempts();
    this.getRoast();
    this.getRoastId();
    $('body').addClass('attempt');
  }

  componentWillUnmount() {
    $('body').removeClass('attempt');
  }

  deleteSingleAttempt = (attemptId) => {
    attemptsRequests.deleteAttempt(attemptId)
      .then(() => {
        this.getAttempts();
      });
  }

  passAttemptToEdit = (attemptId) => {
    const { modal } = this.state;
    this.setState({
      isEditing: true,
      editId: attemptId,
      modal: !modal,
    });
  }

  formSubmitEvent = (newAttempt) => {
    const { isEditing, editId } = this.state;
    if (isEditing) {
      attemptsRequests.updateAttempt(editId, newAttempt)
        .then(() => {
          this.getAttempts();
          this.setState({ isEditing: false, modal: false });
        });
    } else {
      attemptsRequests.createAttempt(newAttempt)
        .then(() => {
          this.getAttempts();
          this.setState({ modal: false });
        });
    }
  }

  render() {
    const {
      roast,
      bean,
      isEditing,
      editId,
      modal,
      roastId,
      filteredAttempts,
      firstCrack,
      secondCrack,
      end,
      view,
      isSearching,
      graph,
      factModal,
    } = this.state;

    const uid = authRequests.getCurrentUid();

    const attemptCards = filteredAttempts.map(attempt => (
      <AttemptCard
        key={attempt.id}
        attempt={attempt}
        uid={uid}
        deleteSingleAttempt={this.deleteSingleAttempt}
        passAttemptToEdit={this.passAttemptToEdit}
      />
    ));

    const makeForm = () => (
      <div className='form-container col'>
        <AddAttempts
          isEditing={isEditing}
          onSubmit={this.formSubmitEvent}
          editId={editId}
          setSelect={this.setSelect}
          roast={roast}
          roastId={roastId}
        />
      </div>
    );

    const makeSearch = () => {
      if (isSearching) {
        return (
          <SearchField
            placeholder="Search By Attempt Date..."
            onChange={ this.onChange }
            searchText=""
            classNames="test-class w-50 animated slideInLeft"
            onEnter={this.onEnter}
            onSearchClick={this.onSearchClick}
          />
        );
      }
      return (<div></div>);
    };

    const makeGraph = () => (
      <div className="graph-container mt-3 pt-3 text-center w-75">
        <AttemptsGraph
        firstCrack={firstCrack}
        secondCrack={secondCrack}
        end={end}
        />
      </div>
    );

    return (
      <div className="Attempts mx-auto w-100">
        <Facts
        factModal={factModal}
        toggleFactModal={this.toggleFactModal}
        />
        <div className="btn-div col w-100">
          <button
            type="button"
            className="bttn-material-circle bttn-sm bttn-royal"
            onClick={this.toggleGraph}>
            <i className="fas fa-chart-line" />
          </button>
          <button
            type="button"
            className="bttn-material-circle bttn-sm bttn-success ml-2"
            onClick={this.toggleModal}>
            <i className="fas fa-plus-circle" />
          </button>
          <button
            type="button"
            className="bttn-material-circle bttn-sm bttn-primary ml-2"
            onClick={this.toggleSearch}>
            <i className="fas fa-search" />
          </button>
          <button
            type="button"
            className="bttn-material-circle bttn-sm bttn-danger ml-2"
            onClick={this.toggleFactModal}>
            ?
          </button>
        </div>
        <div className="search-div">{makeSearch()}</div>
        <div>
          <MyModal
          makeForm = {makeForm()}
          isEditing={isEditing}
          modal={modal}
          toggleModal={this.toggleModal}
          view={view}
          />
          <MyGraphModal
            makeGraph={makeGraph()}
            graph={graph}
            toggleGraph={this.toggleGraph}
          />
        </div>
        <div className="col-5 mx-auto">
          <div className="card attempts-roast-card col m-3 mx-auto animated slideInRight rounded">
            <div className="card-header roast-card-header mt-3 rounded">
              <h5 className="card-title text-center">Selected Roast:</h5>
              <h5 className="card-title text-center">{roast.roastName}</h5>
            </div>
            <div className="card-body">
            <h5 className="card-text text-center font-weight-bold">{bean.name}</h5>
            <p className="card-text text-center">{bean.origin}</p>
            </div>
            <div className="mx-auto">
              <span className="col">
            <button className="bttn-stretch bttn-sm add-attempt-btn mt-3 mb-3" onClick={this.toggleModal}>
              <i className="fas fa-plus-circle">    Add Attempt</i>
            </button>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="justify-content-center row animated slideInLeft">{attemptCards}</div>
        </div>
      </div>
    );
  }
}

export default Attempts;
