import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'
import Ionicon from 'react-ionicons'

// Imagine you have a list of languages that you'd like to autosuggest.
const languages = [
  {
    name: 'Chris Raulli'
  },
  {
    name: 'Adam Higham'
  },
  {
    name: 'Brent Corbitt'
  },
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : languages.filter(lang =>
      lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
    <div>
      {suggestion.name}
    </div>
);


class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, {newValue}) => {
    this.setState({
      value: newValue
    })
  }

  onSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  render() {
    const {value, suggestions} = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search for a runner',
      value,
      onChange: this.onChange
    };

    return (
        <div className="search-bar">

          <Autosuggest
              className="search"
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              renderSuggestion={renderSuggestion}
              inputProps={inputProps}
          />
          <a href="" className="search-button">
            <Ionicon icon="md-search" fontSize="26px" color="white"/>
          </a>

          <div className="filters">
            <p>filter by:</p>
            <a>all runners</a>
            <a>St. Jude Heroes</a>
            <a>Boston Qualifiers</a>
            <a>Age group winners</a>
          </div>
        </div>
    )
  }
}

export default SearchBar