import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
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
>>>>>>> 4d9471dff0d6aafc108295959e582904275d87bf
    </div>
  );
}

export default App;
