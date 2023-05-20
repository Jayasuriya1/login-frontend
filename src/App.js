import './App.css';
import Login from './Component/Login';
import { Route, Routes,Navigate } from 'react-router-dom';
import DashBoard from './Component/DashBoard';
export const url ='https://login-cwmh.onrender.com' //"http://localhost:8000"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='login' element={<Login/>}/>
        <Route path='dashboard' element={<DashBoard/>}/>
        <Route path='*' element={<Navigate to="/login"/>}/>
      </Routes>

    </div>
  );
}

export default App;
