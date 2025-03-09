import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Welcome from './pages/welcome/Welcome';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {/* Aquí irán más rutas cuando las implementes */}
          <Route path="*" element={<Welcome />} /> {/* Ruta para manejar 404 */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;