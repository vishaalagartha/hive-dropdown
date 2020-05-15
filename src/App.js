import React from 'react';
import './App.css';
import Dropdown from './Dropdown'

function App() {
  const generateOption = i => {
    let r = Math.random().toString(36).substring(7)
    return r
  }

  const logOptions = (options) => {
    console.log(options)
  }

  const options = [ ...Array(100).keys() ].map((i) => generateOption(i))
  return (
    <div>
      <header className='header'>
        Hive Dropdown Demo
      </header>
      <Dropdown title='Title' options={options} onValueChange={logOptions} multiselect={true} search={true} selectAll={true}/>
    </div>
  );
}

export default App;
