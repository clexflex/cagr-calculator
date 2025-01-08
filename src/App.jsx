import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import CAGRCalculator from './components/CAGRCalculator';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cagr" element={<CAGRCalculator />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;