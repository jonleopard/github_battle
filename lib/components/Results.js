var React = require('react');
var PropTypes = require('prop-types');
var queryString = require('query-string');
var api = require('../utils/api');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');
var Loading = require('./Loading');

function Profile(props) {
  var info = props.info;

  return React.createElement(
    PlayerPreview,
    { username: info.login, avatar: info.avatar_url },
    React.createElement(
      'ul',
      { className: 'space-list-items' },
      info.name && React.createElement(
        'li',
        null,
        info.name
      ),
      info.location && React.createElement(
        'li',
        null,
        info.location
      ),
      info.company && React.createElement(
        'li',
        null,
        info.company
      ),
      React.createElement(
        'li',
        null,
        'Followers: ',
        info.followers
      ),
      React.createElement(
        'li',
        null,
        'Following: ',
        info.following
      ),
      React.createElement(
        'li',
        null,
        'Public Repos: ',
        info.public_repos
      ),
      info.blog && React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: info.blog },
          info.blog
        )
      )
    )
  );
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
};

function Player(props) {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'h1',
      { className: 'header' },
      props.label
    ),
    React.createElement(
      'h3',
      { style: { textAlign: 'center' } },
      'Score: ',
      props.score
    ),
    React.createElement(Profile, { info: props.profile })
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
};

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    var players = queryString.parse(this.props.location.search);

    api.battle([players.playerOneName, players.playerTwoName]).then(function (players) {
      if (players === null) {
        return this.setState(function () {
          return {
            error: 'Looks like there was an error. Check that both users exist on Github.',
            loading: false
          };
        });
      }

      this.setState(function () {
        return {
          error: null,
          winner: players[0],
          loser: players[1],
          loading: false
        };
      });
    }.bind(this));
  }
  render() {
    var error = this.state.error;
    var winner = this.state.winner;
    var loser = this.state.loser;
    var loading = this.state.loading;

    if (loading === true) {
      return React.createElement(Loading, null);
    }

    if (error) {
      return React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          error
        ),
        React.createElement(
          Link,
          { to: '/battle' },
          'Reset'
        )
      );
    }

    return React.createElement(
      'div',
      { className: 'row' },
      React.createElement(Player, {
        label: 'Winner',
        score: winner.score,
        profile: winner.profile
      }),
      React.createElement(Player, {
        label: 'Loser',
        score: loser.score,
        profile: loser.profile
      })
    );
  }
}

module.exports = Results;