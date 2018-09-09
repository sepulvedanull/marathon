import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div>
    <header>
      <h1>St. Jude Memphis Marathon</h1>
      <p>In 2017 St. Jude Children's Research Hospital witnessed 2,347 people
      complete 26.2 miles through the streets of Memphis, TN. Based on<a href="http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML">public race result data</a>, this
      visualization seeks to explore the data behind the runners. A majority of the runners traveled from Tennessee (60%),
      Mississippi (44%), and Arkansas (40%), while some traveled from as far as provinces in Canada! Out of the 2,347
      people who finished</p>
      <p><strong className="male-gender">1,284 were male</strong> and
        <strong className="female-gender"> 1,063 were female</strong>.</p>
    </header>
    <App/>
  </div>
  , document.getElementById('root'));
registerServiceWorker();
