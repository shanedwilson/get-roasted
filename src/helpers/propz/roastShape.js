import PropTypes from 'prop-types';

const roastShape = PropTypes.shape({
  beanId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  roastName: PropTypes.string.isRequired,
});

const roastOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  roastShape,
]);

export default { roastShape, roastOptionalShape };
