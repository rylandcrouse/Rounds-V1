import './App.css';
import {useContext, useEffect} from 'react';
import {context} from './index';
import Routes from './Routes';
import { useObserver } from 'mobx-react-lite';

function App() {
  const store = useContext(context);

  useEffect(() => {
    console.log(store)
    // store.io.connect();
    store.auth.auto();
    return () => {
      return
    }
  }, [])
  
  return useObserver(() =>(
    <div className="App">
      {store.auth.autoTried ? <Routes /> : <p>LOADING''''''''''''''''''''</p>}
    </div>
  ));
}

export default App;
