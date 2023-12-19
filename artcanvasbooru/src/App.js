import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import './App.css'

// layout
import Dashboard from './pages/Dashboard';
import Signup from './layout/Signup';
import Login from './layout/Login';
import User from './layout/User';
import Art from './layout/Art';

function App() {
  return (
    <Router> {/* Wrap the entire application with Router */}
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/dashboard" element={<Dashboard />} exact/>
        </Route>
        

        <Route path='/art/:username/:id' element={<Art />} />
        <Route path='/artist/:username' element={<User />}  />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;