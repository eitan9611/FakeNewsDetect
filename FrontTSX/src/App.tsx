import React, { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import RedFlags from './pages/RedFlags';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [analysisData, setAnalysisData] = useState({
    inputText: '',
    results: null,
    entities: [],
  });

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/analysis" 
            element={
              <Analysis 
                analysisData={analysisData} 
                setAnalysisData={setAnalysisData} 
              />
            } 
          />
          <Route 
            path="/red-flags" 
            element={
              <RedFlags 
                analysisData={analysisData}
              />
            } 
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;