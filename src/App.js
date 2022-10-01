
import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './layout/layout';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Suspense>
          <Routes>
            <Route path="/" exact element={<Layout />} />
          </Routes>
        </Suspense>
      </Router>
    </React.Fragment >
  );
}

export default App;
