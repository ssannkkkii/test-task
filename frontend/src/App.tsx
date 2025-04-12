import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';import SneakerList from './components/SneakerList';
import SneakerDetail from './components/SneakerDetail';
import Header from './components/Headers';
import './styles.scss';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/sneaker/:id" element={<SneakerDetail />} />
          <Route path="/" element={<SneakerList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
