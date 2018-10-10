import React, {Component} from 'react'


class ResultsTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:4000/runners')
        .then(response => response.json())
        .then(data => this.setState({data}))
  }

  renderResults = () => {
    if (this.state.data !== null) {
      return this.state.data.map(runner => {
        return (
            <tr>
              <td>{runner.Place}</td>
              <td>{runner.Race}</td>
              <td>{runner.Name}</td>
              <td>{/*runner.Unnamed: 3 */}</td>
              <td> {runner.Age}</td>
              <td> {/*runner.Sex_plc*/}</td>
              <td>{runner.Sex}</td>
              <td> {runner.Rank}</td>
              <td> {/*runner.10k*/}</td>
              <td> {/*runner.Rank.1*/}</td>
              <td>{runner.Halfway}</td>
              <td>{/*runner.Rank.2*/}</td>
              <td>{/*runner.30k */}</td>
              <td>{runner.Time}</td>
              <td>{runner.Pace}</td>
              <td>{runner.City}</td>
              <td>{runner.State}</td>
              <td>{/*runner.Clock Time*/}</td>
              <td>{/*runner.Bib#*/}</td>
              <td><a href="http://www.youtube.com/watch?v=YiBSNzj9YZk&amp;t=8291s">{runner.Link}</a></td>
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
              <th>Race</th>
              <th>Name</th>
              <th></th>
              <th>Age</th>
              <th>Sex/plc</th>
              <th>Sex</th>
              <th>Rank</th>
              <th>10k</th>
              <th>Rank</th>
              <th>Halfway</th>
              <th>Rank</th>
              <th>30k</th>
              <th>Time</th>
              <th>Pace</th>
              <th>City</th>
              <th>State</th>
              <th>Clock Time</th>
              <th>Bib#</th>
              <th>Link</th>
            </tr>
            {this.renderResults()}
            </tbody>
          </table>

        </div>
    )
  }
}

export default ResultsTable