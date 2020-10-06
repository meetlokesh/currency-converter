import React from 'react';
import './App.css';
import CurrencyConverter from './Components/CurrencyConverter/CurrencyConverter'


function App() {
  return (
    <div className="App">
      <header className="app-header">
        <CurrencyConverter></CurrencyConverter>
      </header>
    </div>
  );
}

export default App;
