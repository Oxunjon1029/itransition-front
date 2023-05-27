import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import LoginAndRegisteration from './pages/LoginAndRegisteration';
import UserManagement from './pages/UserManagement'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Registeration from './pages/Registeration';
import { ToastContainer } from 'react-toastify'
import { getCookie } from './config/functions/useCookie';
import { TOKEN } from './config/constants/host';

import ProtectedRoute from './components/ProtectedRoute';
const routes = [
  {
    id: 0,
    path: '/signup',
    element: <Registeration />,
  },
  {
    id: 1,
    path: '/signin',
    element: <Login />
  }
]
function App() {
  let token = getCookie(TOKEN);
  const location = useLocation()

  return (
    <div className="App">
      <ToastContainer />
      {
        location.pathname === '/' &&
        <Navigate to='/signup' />

      }

      <Routes>
        <Route path="/" element={<LoginAndRegisteration />} >
          {routes.map((route) => (
            <Route path={route.path} key={route.id} element={route.element} />
          ))}
        </Route>


        <Route path="/users" element={
          <ProtectedRoute token={token}>
            <UserManagement />
          </ProtectedRoute>} />
      </Routes>


    </div>
  );
}

export default App;
