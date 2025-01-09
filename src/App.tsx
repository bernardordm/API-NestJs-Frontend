import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserManagement from './Pages/UserManagement/UserManagement'
import UserDetails from './Pages/UserManagement/UserDetails'
import SignupForm from './components/SignupForm/SignupForm'
import SignupPage from './Pages/UserManagement/UserSignup'

function App() {
  return (
    <Routes>
      <Route path="/" element={ <UserManagement /> }/>
      <Route path="/UserManagement" element={ <UserManagement /> }/>
      <Route path="/UserManagement/details/:id" element={ <UserDetails/> }/>
      <Route path="/signup" element={ <SignupPage/> }/>
    </Routes>
  )
}

export default App