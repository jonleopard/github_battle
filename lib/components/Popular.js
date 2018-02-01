var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return React.createElement(
    'ul',
    { className: 'languages' },
    languages.map(function (lang) {
      return React.createElement(
        'li',
        {
          style: lang === props.selectedLanguage ? { color: '#d0021b' } : null,
          onClick: props.onSelect.bind(null, lang),
          key: lang },
        lang
      );
    })
  );
}

function RepoGrid(props) {
  return React.createElement(
    'ul',
    { className: 'popular-list' },
    props.repos.map(function (repo, index) {
      return React.createElement(
        'li',
        { key: repo.name, className: 'popular-item' },
        React.createElement(
          'div',
          { className: 'popular-rank' },
          '#',
          index + 1
        ),
        React.createElement(
          'ul',
          { className: 'space-list-items' },
          React.createElement(
            'li',
            null,
            React.createElement('img', {
              className: 'avatar',
              src: repo.owner.avatar_url,
              alt: 'Avatar for ' + repo.owner.login
            })
          ),
          React.createElement(
            'li',
            null,
            React.createElement(
              'a',
              { href: repo.html_url },
              repo.name
            )
          ),
          React.createElement(
            'li',
            null,
            '@',
            repo.owner.login
          ),
          React.createElement(
            'li',
            null,
            repo.stargazers_count,
            ' stars'
          )
        )
      );
    })
  );
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super();
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });

    api.fetchPopularRepos(lang).then(function (repos) {
      this.setState(function () {
        return {
          repos: repos
        };
      });
    }.bind(this));
  }
  render() {
    return React.createElement(
      'div',
      null,
      React.createElement(SelectLanguage, {
        selectedLanguage: this.state.selectedLanguage,
        onSelect: this.updateLanguage }),
      !this.state.repos ? React.createElement(Loading, null) : React.createElement(RepoGrid, { repos: this.state.repos })
    );
  }
}

module.exports = Popular;