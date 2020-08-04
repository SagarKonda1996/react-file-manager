import React,{useEffect} from 'react';
import M from 'materialize-css';
import './App.css';
import AppLayout from './Components/AppLayout';
function App() {
  useEffect(() => {
    var elems = document.querySelectorAll('.modal');

    var instances = M.Modal.init(elems, {});

}, [])
  return (
    <div>
      <AppLayout/>
    </div>
  );
}

export default App;
