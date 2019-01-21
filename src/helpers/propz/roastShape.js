import PropTypes from 'prop-types';

const RoastShape = PropTypes.shape({
  beanId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

const roastOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  RoastShape,
]);

export default { RoastShape, roastOptionalShape };
  