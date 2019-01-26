import PropTypes from 'prop-types';

const beanShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
});

const beanOptionalShape = PropTypes.oneOfType([
  PropTypes.shape({
    nope: PropTypes.string.isRequired,
  }),
  beanShape,
]);

export default { beanShape, beanOptionalShape };
