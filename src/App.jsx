import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import CreateGame from './pages/createGame/CreateGame';
import ErrorPage from './pages/error/ErrorPage';
import Profile from './pages/profile/Profile';
import Welcome from './pages/welcome/Welcome';

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/create" element={<CreateGame />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;