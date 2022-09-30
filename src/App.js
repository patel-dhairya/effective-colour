import React, {Component} from 'react';
import Palette  from './Palette';
import colorCollection from './colorCollection';

import './App.css';

class App extends Component{
  render() {
    return(
    <div>
      <Palette/>
    </div>
    )
  };
}

export default App;
