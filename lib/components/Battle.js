var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;
var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    var value = event.target.value;

    this.setState(function () {
      return {
        username: value
      };
    });
  }
  handleSubmit(event) {
    event.preventDefault();

    this.props.onSubmit(this.props.id, this.state.username);
  }
  render() {
    return React.createElement(
      'form',
      { className: 'column', onSubmit: this.handleSubmit },
      React.createElement(
        'label',
        { className: 'header', htmlFor: 'username' },
        this.props.label
      ),
      React.createElement('input', {
        id: 'username',
        placeholder: 'github username',
        type: 'text',
        value: this.state.username,
        autoComplete: 'off',
        onChange: this.handleChange
      }),
      React.createElement(
        'button',
        {
          className: 'button',
          type: 'submit',
          disabled: !this.state.username },
        'Submit'
      )
    );
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};

PlayerInput.defaultProps = {
  label: 'Username'
};

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerOneName: '',
      playerTwoName: '',
      playerOneImage: null,
      playerTwoImage: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }
  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Image'] = null;
      return newState;
    });
  }
  render() {
    var match = this.props.match;
    var playerOneName = this.state.playerOneName;
    var playerOneImage = this.state.playerOneImage;
    var playerTwoName = this.state.playerTwoName;
    var playerTwoImage = this.state.playerTwoImage;

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'row' },
        !playerOneName && React.createElement(PlayerInput, {
          id: 'playerOne',
          label: 'Player One',
          onSubmit: this.handleSubmit
        }),
        playerOneImage !== null && React.createElement(
          PlayerPreview,
          {
            avatar: playerOneImage,
            username: playerOneName },
          React.createElement(
            'button',
            {
              className: 'reset',
              onClick: this.handleReset.bind(this, 'playerOne') },
            'Reset'
          )
        ),
        !playerTwoName && React.createElement(PlayerInput, {
          id: 'playerTwo',
          label: 'Player Two',
          onSubmit: this.handleSubmit
        }),
        playerTwoImage !== null && React.createElement(
          PlayerPreview,
          {
            avatar: playerTwoImage,
            username: playerTwoName },
          React.createElement(
            'button',
            {
              className: 'reset',
              onClick: this.handleReset.bind(this, 'playerTwo') },
            'Reset'
          )
        )
      ),
      playerOneImage && playerTwoImage && React.createElement(
        Link,
        {
          className: 'button',
          to: {
            pathname: match.url + '/results',
            search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
          } },
        'Battle'
      )
    );
  }
}

module.exports = Battle;