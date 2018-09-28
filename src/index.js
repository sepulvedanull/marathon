import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div>
    <header>
      <h1><strong>St. Jude</strong> Memphis Marathon Weekend</h1>
      <div className="intro">
        <p>In 2017 St. Jude Children's Research Hospital witnessed 2,347 people
          complete 26.2 miles through the streets of Memphis, TN. Based on <a href="http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML">public race result data</a>, this
          visualization seeks to explore the data behind the runners.</p>
      </div>
    </header>

    <App/>
  </div>
  , document.getElementById('root'));
registerServiceWorker();
