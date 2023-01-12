import React from 'react'
import { Navigate, Route, Routes } from "react-router-dom";
import Login from '../../Components/Auth/Login';
import Registration from '../../Components/Auth/Registration';

const Public = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/register" element={<Registration />} />
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </div>
  )
}

export default Public;