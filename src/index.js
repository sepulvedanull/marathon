import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ResultsTable from './ResultsTable'
import ActiveRunnerCard from './ActiveRunnerCard'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <div className="app-container">

    <App/>
    <ResultsTable/>

  </div>
  , document.getElementById('root'));
registerServiceWorker();
