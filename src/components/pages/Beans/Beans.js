import React from 'react';
import beanRequests from '../../../helpers/data/beanRequests';
import BeanCard from '../../BeanCard/BeanCard';
import AddEditBean from '../../AddEditBean/AddEditBean';

import './Beans.scss';

class Beans extends React.Component {
  state = {
    beans: [],
    uid: '',
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
      <BeanCard 
        key={bean.id}
        bean={bean}
      />
    ));

    return (
  
        <div className="beans">
          <h1 className="text-center">BEANS!!!</h1>
          <div className="row">
            <div className="col mt-5">
              <p className="text-center">Here you'll find a selection of beans from around the world. 
              Click the '+' button on any bean you'd like to roast.</p>
            </div>    
            <div className='form-container col'>
              <AddEditBean />
            </div>
          </div>
          <div className="row justify-content-center">
            {beanCards}
          </div>
        </div>
    )
  }
}

export default Beans;
