import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Signup from './pages/auth/signup/signup';
import Dashboard from './pages/dashboard/dashboard';
import Header from './pages/Header/header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
