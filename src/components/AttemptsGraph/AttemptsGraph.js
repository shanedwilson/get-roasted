import React from 'react';
import PropTypes from 'prop-types';
import {
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Scatter,
  Tooltip,
  Legend,
} from 'recharts';

class AttemptsGraph extends React.Component {
  static propTypes = {
    firstCrack: PropTypes.array,
    secondCrack: PropTypes.array,
    end: PropTypes.array,
  };

  render() {
    const { firstCrack, secondCrack, end } = this.props;

    return (
      <ScatterChart className="mx-auto mt-5" width={1000} height={250}
        margin={
          {
            top: 20, right: 20, bottom: 10, left: 10,
          }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" name="time" type="category" />
        <YAxis dataKey="temp" type="number" domain={['dataMin', 'dataMax']} name="temp" unit="•F" />
        <ZAxis dataKey="rating" name="rating" unit=" stars" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="First Crack" data={firstCrack} fill="red" />
        <Scatter name="Second Crack" data={secondCrack} fill="orange" />
        <Scatter name="End" data={end} fill="maroon" />
      </ScatterChart>
    );
  }
}

export default AttemptsGraph;
