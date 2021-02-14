import logo from './logo.svg';
import './App.css';
import {useContext, useEffect} from 'react';
import {context} from './index';

function App() {
  const store = useContext(context);

  useEffect(() => {
    console.log(store)
    store.io.connect();
    return () => {
      return
    }
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
