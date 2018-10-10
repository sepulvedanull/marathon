import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ResultsTable from './ResultsTable'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <div className="app-container">
      <header>

      </header>

      <App/>

      <ResultsTable/>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
