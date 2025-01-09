import { Routes, Route } from 'react-router-dom'
import './App.css'
import UserManagement from './Pages/UserManagement/UserManagement'
import UserDetails from './Pages/UserManagement/UserDetails'
import Login from './Pages/Login/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> }/>
      <Route path="/UserManagement" element={ <UserManagement /> }/>
      <Route path="/UserManagement/details/:id" element={ <UserDetails/> }/>
    </Routes>
  )
}

export default App