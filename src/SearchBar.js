import React, {Component} from 'react'
import Autosuggest from 'react-autosuggest'

class SearchBar extends Component {
  constructor (props) {
    super(props)
  }


  onSuggestionsFetchRequested = () => {

  }

  onSuggestionsClearRequested = () => {

  }

  render() {
    const suggestions = ['frank', 'tim', 'bob']
    const inputProps = {
      placeholder: 'Type a programming language'
    }
    return(
      <div className="search-bar">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <input type="text" className="search" placeholder="search runner's name"/>
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