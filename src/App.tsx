import { Routes, Route } from 'react-router-dom';
import './App.css';
import UserManagement from './Pages/UserManagement/UserManagement';
import UserDetails from './Pages/UserManagement/UserDetails';
import SignupPage from './Pages/UserManagement/UserSignup';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import SMSPage from './Pages/SMSPage/sms-Page';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/UserManagement" element={<UserManagement />} />
      <Route path="/UserManagement/details/:id" element={<UserDetails />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/home" element={<Login />} />
      <Route path="/sms" element={<SMSPage />} />
    </Routes>
  );
}

export default App;