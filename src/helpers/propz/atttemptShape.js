import PropTypes from 'prop-types';

const attemptShape = PropTypes.shape({
  uid: PropTypes.string.isRequired,
  roastId: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  endTime: PropTypes.string.isRequired,
  endTemp: PropTypes.number.isRequired,
  firstTime: PropTypes.string.isRequired,
  firstTemp: PropTypes.number.isRequired,
  secondTime: PropTypes.string.isRequired,
  secondTemp: PropTypes.number.isRequired,
  roastLevel: PropTypes.string.isRequired,
});

const attemptOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  attemptShape,
]);

export default { attemptShape, attemptOptionalShape };
