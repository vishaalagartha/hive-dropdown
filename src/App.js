import React from 'react';
import './App.css';
import {cities} from './mockData'
import Dropdown from './Dropdown'

function App() {
  const logOptions = (options) => {
    console.log(options)
  }

  return (
    <div>
      <header className='header'>
        Hive Dropdown Demo
      </header>
      <Dropdown title='Select location' options={cities} onValueChange={logOptions} multiselect={true} search={true} selectAll={true}/>
    </div>
  );
}

export default App;
