import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RouteHandler from './components/RouteHandler/RouteHandler';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className='App'>
      <RouteHandler />
      <Footer />
    </div>
  );
}

export default App;
