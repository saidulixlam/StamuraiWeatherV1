import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CityPage from './components/CityPage';
import WeatherPage from './components/WeatherPage';
const App = () => {

  return (
    <div className='mx-2 p-2 my-2'>
      <Router>
      <Routes>
        <Route exact path="/" element={<CityPage />} />
        <Route path="/:city/:latitude/:longitude" element={<WeatherPage />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
