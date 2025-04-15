import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/login/login';
import Signup from './pages/auth/signup/signup';
import Dashboard from './pages/dashboard/dashboard';
import Header from './pages/Header/header';
import TaskForm from './pages/dashboard/task/taskform';




function App() {
  return (
    <>
      <Header />
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<TaskForm />} />
        
      </Routes>
    </>
  );
}

export default App;
