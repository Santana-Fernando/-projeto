import React from 'react';
import ReactDOM from 'react-dom';
import './components/styles/global-styles.css';
import { Home } from './tamplates/Home/index';

ReactDOM.render(
  <React.StrictMode>
    <Home name={"Fernando"}/>
  </React.StrictMode>,
  document.getElementById('root')
);
