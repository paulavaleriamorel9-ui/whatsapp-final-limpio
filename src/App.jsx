import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="app-container"> 
      <Routes>
        <Route path="/" element={<MainLayout />} /> 
        <Route path="/chat/:characterId" element={<ChatWindow />} />
      </Routes>
    </div>
  );
}

export default App;