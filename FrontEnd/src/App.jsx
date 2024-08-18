import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Auth />} />
            {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} /> */}
        </Routes>
    );
};

export default App;
