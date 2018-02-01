var React = require('react');
var NavLink = require('react-router-dom').NavLink;

function Nav() {
  return React.createElement(
    'ul',
    { className: 'nav' },
    React.createElement(
      'li',
      null,
      React.createElement(
        NavLink,
        { exact: true, activeClassName: 'active', to: '/' },
        'Home'
      )
    ),
    React.createElement(
      'li',
      null,
      React.createElement(
        NavLink,
        { activeClassName: 'active', to: '/battle' },
        'Battle'
      )
    ),
    React.createElement(
      'li',
      null,
      React.createElement(
        NavLink,
        { activeClassName: 'active', to: '/popular' },
        'Popular'
      )
    )
  );
}

module.exports = Nav;