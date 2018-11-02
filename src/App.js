import React, { Component } from 'react'
import Header from './Header'
import Chart from './Chart'
import ActiveRunnerCard from './ActiveRunnerCard'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="canvas-container">
        <Header/>
        <Chart />
        <ActiveRunnerCard />
      </div>
    )
  }
}

export default App