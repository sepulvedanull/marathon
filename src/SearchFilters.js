import React, {Component} from 'react'


class SearchFilters extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="filters">
        <p>filter by:</p>
        <a>all runners</a>
        <a>St. Jude Heroes</a>
        <a>Boston Qualifiers</a>
        <a>Age group winners</a>
      </div>
    )
  }
}

export default SearchFilters