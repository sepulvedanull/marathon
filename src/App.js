import React, { Component } from 'react'
import Header from './Header'
import Chart from './Chart'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="canvas-container">
        <Header/>
        <Chart />
      </div>
    )
  }
}

export default App