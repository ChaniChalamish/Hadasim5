import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Orders from './components/Orders'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  )
}

export default App
