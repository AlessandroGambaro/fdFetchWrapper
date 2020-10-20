import React from 'react';

import { FetchWrapper } from './lib/index';



function App() {

  function status_401_403(Message) {
    alert("Log Out");
  }

  const runner = new FetchWrapper(null, null, status_401_403);

  function onClick() {
    runner.get('http://localhost:61419/weatherforecast').then(response => {
      alert(response);
    }).catch(errorMessage => {
      if (errorMessage)
        alert(errorMessage);
    });
  }

  return (
    <React.Fragment>
      <button onClick={onClick}>Fetch Test</button>
    </React.Fragment>
  );
}

export default App;
