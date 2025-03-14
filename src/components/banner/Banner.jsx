import { PencilLine, LogOut, Volume2, VolumeX, ArrowLeft } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Frame from '../frame/Frame';
import './banner.css';

const Banner = ({ viewText, options=[true,true,true,false], back }) => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleSound = () => {
        // Create new user object with updated soundEnabled value
        const updatedUser = {
            ...user,
            soundEnabled: !user.soundEnabled
        };
        
        setUser(updatedUser);
    }
    
    const logOut = () => {
        let confirm = window.confirm('Are you sure you want to log out?\nAll your data will be lost');
        if (!confirm) return;
        localStorage.removeItem('user');
        navigate('/');
        window.location.reload();
        
    }
    
    const changeName = () => {
        let newName = prompt('Enter your new name', user.nickname);
        if (!newName) return;
        
        setUser({
            ...user,
            nickname: newName
        });
    }
    
    return (
        <div className="banner">
            <h1 className='banner__text'>{viewText}</h1>
            <div className="banner_options">
                {options[0] && <LogOut size={35} onClick={logOut} aria-label="Log Out" />}
                {options[1] && <PencilLine size={35} onClick={changeName} aria-label="Edit name" />}
                {options[2] && ( 
                    user.soundEnabled ? 
                    <Volume2 size={35} onClick={handleSound} aria-label="Sound On" /> : 
                    <VolumeX size={35} onClick={handleSound} aria-label="Sound Off" /> 
                )}
                {options[3] && <ArrowLeft size={35} className='banner__left' onClick={back} aria-label="Back" />}
            </div>
        </div>
    );
}

export default Banner;