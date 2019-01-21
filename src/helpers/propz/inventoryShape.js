import PropTypes from 'prop-types';

const inventoryShape = PropTypes.shape({
  beanId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  pound: PropTypes.number.isRequired,
  ounces: PropTypes.number.isRequired,
});

const inventoryOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  inventoryShape,
]);

export default { inventoryShape, inventoryOptionalShape };
  