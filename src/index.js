import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import ResultsTable from './ResultsTable'
import SearchBar from './SearchBar'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <div className="app-container">

      <App/>
      <SearchBar />
      <ResultsTable/>
    </div>
    , document.getElementById('root'));
registerServiceWorker();
