import React, { useState, useCallback } from 'react'
import logo from './logo.svg';
import './App.css';
function App() {

  const [dataList, setResult] = useState([])

  function getJokes(searchTerm, limit = 15) {
    fetch(`https://icanhazdadjoke.com/search?term=${searchTerm}&limit=${limit}`,{
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
    }).then(response => response.json())
      .then(json => {
        const jokes = json.results;
        setResult(jokes)
      });
  };

  const debounce = (func, dealy) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args)
      }, dealy);
    };
  };
  // eslint-disable-next-line
  const debounceFunction = useCallback(debounce(getJokes, 200));
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Debounceing <code>React.js</code> and Hook.
        </p>
        <input
          className="App-link"
          type="text"
          name="search"
          onChange={(e) => debounceFunction(e.target.value)}
        />
         <ul>
            {dataList && dataList.map((item, index) => (
              <li key={index}>{item.joke}</li>
            ))}
         </ul>
      </header>
    </div>
  );
}

export default App;
