import React, { Component } from 'react'

class ActiveRunnerCard extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="athlete-card">
        <div className="card-header">
          <h1>Stephanie Williams</h1>
          <p>Bib #: 123456</p>
          <a href="" className="certificate-link">Download Certificate</a>
        </div>
        <div className="card-body">
          <section className="performance">
            <h3>Performance Summary</h3>
            <div id="mini-chart">

            </div>
          </section>
          <section className="achievements">
            <h3>Achievements</h3>
          </section>
          <section className="media">
            <h3>Media</h3>
          </section>

        </div>
      </div>
    )
  }
}

export default ActiveRunnerCard