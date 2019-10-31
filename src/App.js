import React from 'react';
import Routes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles.css';

import Header from './components/Header'

require('dotenv').config();

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
