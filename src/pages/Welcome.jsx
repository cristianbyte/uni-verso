import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import './welcome.css';

function Welcome() {
    const { user, setUser } = useContext(UserContext);
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
      e.preventDefault();
      setUser({...user, nickname});
      navigate('/profile'); // Redirige a la siguiente vista
    };
    
    return (
      <div className="welcome-page">
        <form onSubmit={handleSubmit} className='form' >
        <h1>LessMatch</h1>
          <input 
            type="text" 
            value={nickname} 
            onChange={(e) => setNickname(e.target.value)} 
            placeholder="Nickname"
            required
          />
          {/* Selector de foto lo implementaremos después */}
          <Button type="submit" text='Continue' ></Button>
        </form>
      </div>
    );
  }
  
  export default Welcome;