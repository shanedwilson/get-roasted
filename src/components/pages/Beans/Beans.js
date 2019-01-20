import React from 'react';
import beanRequests from '../../../helpers/data/beanRequests';

import './Beans.scss';

class Beans extends React.Component {
  state = {
    beans: [],
  }

  getBeans = () => {
    beanRequests.getAllBeans()
    .then((beans) => {
      this.setState({ beans });
    })
  };

  componentDidMount() {
    this.getBeans();
  }  

  render() {
    const { beans } = this.state;

    const beanCards = beans.map(bean => (
      <div key={bean.id} className="card col-3 m-3">
        <img className="card-img-top" src={bean.imgUrl} alt={bean.name} />
        <div className="card-body">
          <h5 className="card-title">{bean.name}</h5>
          <p className="card-text">{bean.description}</p>
        </div>
      </div>
    ));

    return (
  
        <div className="Beans">
          <h1 className="text-center">BEANS!!!</h1>
          <div className="row justify-content-center">
            {beanCards}
          </div>
        </div>
    )
  }
}

export default Beans;
