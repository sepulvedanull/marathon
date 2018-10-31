import React, {Component} from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import Select from 'react-select'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="canvas-header">
        <div className="primary-header">
          <h1>St. Jude Memphis Marathon Weekend | Finisher Results</h1>
          <div className="event-filters">
            <div className="event-year">
              <p>Select Year:</p>
              <Select className="dropdown-filter" defaultValue={{value: '2017', label: '2017'}}
                      options={[
                        {value: '2017', label: '2017'},
                        {value: '2016', label: '2016'},
                        {value: '2015', label: '2015'},
                        {value: '2014', label: '2014'}
                      ]}/>

            </div>

            <div className="event-type">
              <p>Select Event:</p>
              <Select className="dropdown-filter" defaultValue={{value: 'marathon', label: 'marathon'}} options={[
                {value: 'marathon', label: 'marathon'},
                {value: 'half-marathon', label: 'half-marathon'},
                {value: '10k', label: '10k'},
                {value: '5k', label: '5k'}
              ]}/>
            </div>
          </div>
        </div>
        <div className="secondary-header">
          <div className="help-link">
            <a href="">Need help?</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Header