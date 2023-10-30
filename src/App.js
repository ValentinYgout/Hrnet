
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';

function App() {
  return (
    <div className="App">
    
      <Routes>
        <Route path="/" element={<CreateEmployee/>} />
        <Route path="/employee-list" element={<EmployeeList/>} />
      </Routes>
  
    </div>
  );
}

export default App;
