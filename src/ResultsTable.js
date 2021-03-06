import React, {Component} from 'react'


class ResultsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
    fetch(`${process.env.REACT_APP_API_URL}/2014/marathon`)
        .then(response => response.json())
        .then(data => this.setState({data}))
  }

  renderResults = () => {
    if (this.state.data !== null) {
      return this.state.data.map(runner => {
        return (
            <tr>
              <td>{runner.Place}</td>
              <td>{`${runner.Name} ${runner["Unnamed: 3"]}`}</td>
              <td>{runner["Bib#"]}</td>
              <td> {runner.Age}</td>
              <td> {runner["Sex\/plc"]}</td>
              <td>{runner.Sex}</td>
              <td> {runner.Rank}</td>
              <td> {runner["10k"]}</td>
              <td>{runner.Halfway}</td>
              <td>{runner["30k"]}</td>
              <td>{runner.Time}</td>
              <td>{runner.Pace}</td>
              <td>{runner.City}</td>
              <td>{runner.State}</td>
              <td>{runner["Clock Time"]}</td>
            </tr>
        )
      })
    }

  }

  render() {
    return (
        <div>
          <h1>Results</h1>


          <table className="results">
            <tbody>
            <tr>
              <th>Place</th>
              <th>Name</th>
              <th>Bib #</th>
              <th>Age</th>
              <th>Sex/plc</th>
              <th>Sex</th>
              <th>Rank</th>
              <th>10k</th>
              <th>Halfway</th>
              <th>30k</th>
              <th>Time</th>
              <th>Pace</th>
              <th>City</th>
              <th>State</th>
              <th>Clock Time</th>
            </tr>
            {this.renderResults()}
            </tbody>
          </table>

        </div>
    )
  }
}

export default ResultsTable