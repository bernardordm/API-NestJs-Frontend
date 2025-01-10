import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserManagement from '../src/Pages/UserManagement/UserManagement';
import UserDetails from '../src/Pages/UserManagement/UserDetails';
import SignupPage from '../src/Pages/UserManagement/UserSignup';
import Login from '../src/Pages/Login/Login';
import Home from '../src/Pages/Home/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/UserManagement" element={<UserManagement />} />
      <Route path="/UserManagement/details/:id" element={<UserDetails />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;