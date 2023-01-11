import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Registration from './Components/Registration';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/login" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
