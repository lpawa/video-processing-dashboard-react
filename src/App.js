import React from 'react';
import './App.css';
import SegmentVideo from "./Components/SegmentVideo";
import CombineVideo from "./Components/CombineVideo";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <SegmentVideo/>
          <CombineVideo/>
        </div>
      </header>
    </div>
  );
}

export default App;
