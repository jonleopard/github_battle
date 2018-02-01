var React = require('react');
var PropTypes = require('prop-types');

function PlayerPreview(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { className: 'column' },
      React.createElement('img', {
        className: 'avatar',
        src: props.avatar,
        alt: 'Avatar for ' + props.username
      }),
      React.createElement(
        'h2',
        { className: 'username' },
        '@',
        props.username
      )
    ),
    props.children
  );
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

module.exports = PlayerPreview;