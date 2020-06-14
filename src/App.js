import React from 'react';
import logo from './logo.svg';
import './App.css';
import ConsoleView from "./views/console";
import HeaderComponent from "./core/elements/header-nav";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <header className="App-header">


        <ConsoleView />
      </header>
    </div>
  );
}

export default App;
