import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Welcome from './pages/Welcome';
import './styles/main.css';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* Aquí irán más rutas cuando las implementes */}
          <Route path="*" element={<Welcome />} /> {/* Ruta para manejar 404 */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;