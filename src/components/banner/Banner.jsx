import { PencilLine, LogOut, Volume2, VolumeX, ArrowLeft,RefreshCcw } from 'lucide-react';
import { updateUser } from '../../services/userService/updateUser';
import { getUser } from '../../services/userService/getUser';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Frame from '../frame/Frame';
import './banner.css';

const Banner = ({ viewText, options=[true,true,true,false], back }) => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRefresh = async () => {
              const result = await getUser(user);
              setUser({
                ...user,
                nickname : result.name,
                profileImage: result.icon
              });
    }
    
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
        window.location.reload();
        
    }
    
    const changeName = async () => {
        let newName = prompt('Enter your new name', user.nickname);
        if (!newName) return;
            
        const result = await updateUser({
            id: user.myuuid,
            name: newName,
            icon: user.profileImage
        });

        setUser({
            ...user,
            nickname: result.name
        });

    }
    
    return (
        <div className="banner">
            <h1 className='banner__text'>{viewText}</h1>
            <div className="banner_options">
                 <LogOut size={35} onClick={logOut} aria-label="Log Out" />
                <PencilLine size={35} onClick={changeName} aria-label="Edit name" />
                {
                    user.soundEnabled ? 
                    <Volume2 size={35} onClick={handleSound} aria-label="Sound On" /> : 
                    <VolumeX size={35} onClick={handleSound} aria-label="Sound Off" /> 
                }
                {
                    window.location.pathname == "/profile" ? 
                    <RefreshCcw size={35} className='banner__left' onClick={handleRefresh} /> :
                    <ArrowLeft size={35} className='banner__left' onClick={back} aria-label="Back" /> 
                }
            </div>
        </div>
    );
}

export default Banner;