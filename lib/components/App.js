var React = require('react');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Popular = require('./Popular');
var Results = require('./Results');

class App extends React.Component {
  render() {
    return React.createElement(
      Router,
      null,
      React.createElement(
        'div',
        { className: 'container' },
        React.createElement(Nav, null),
        React.createElement(
          Switch,
          null,
          React.createElement(Route, { exact: true, path: '/', component: Home }),
          React.createElement(Route, { exact: true, path: '/battle', component: Battle }),
          React.createElement(Route, { path: '/battle/results', component: Results }),
          React.createElement(Route, { path: '/popular', component: Popular }),
          React.createElement(Route, { render: function () {
              return React.createElement(
                'p',
                null,
                'Not Found'
              );
            } })
        )
      )
    );
  }
}

module.exports = App;