import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import CreateDog from './components/CreateDog';
//const LazyDetail = React.lazy(() => import('./components/Detail'))
import Detail from './components/Detail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/home" element={<Home />} />

          <Route path="/dogs" element={<CreateDog />} />

          <Route path='/dogs/:id' element={<Detail />} />
          
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
