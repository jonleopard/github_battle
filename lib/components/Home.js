var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return React.createElement(
      'div',
      { className: 'home-container' },
      React.createElement(
        'h1',
        null,
        'Github Battle: Battle your friends for the glory!'
      ),
      React.createElement(
        Link,
        { className: 'button', to: '/battle' },
        'Battle'
      )
    );
  }
}

module.exports = Home;