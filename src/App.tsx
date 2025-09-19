import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SweepstakesLanding from './components/SweepstakesLanding';
import GeneratorPage from './components/GeneratorPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SweepstakesLanding />} />
      <Route path="/generate" element={<GeneratorPage />} />
    </Routes>
  );
}

export default App;