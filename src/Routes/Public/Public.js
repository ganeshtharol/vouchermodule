import React from 'react'
import { Route, Routes } from "react-router-dom";
import Login from '../../Components/Auth/Login';
import Registration from '../../Components/Auth/Registration';

const Public = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
      
      </Routes>
    </div>
  )
}

export default Public;