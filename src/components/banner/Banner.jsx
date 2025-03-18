import { PencilLine, LogOut, Volume2, VolumeX, ArrowLeft,RefreshCcw } from 'lucide-react';
import { deleteUser } from '../../services/userService/deleteUser';
import { updateUser } from '../../services/userService/updateUser';
import { getUser } from '../../services/userService/getUser';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Frame from '../frame/Frame';
import './banner.css';

const Banner = ({ viewText, back }) => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleRefresh = async () => {
        // implement when the user does not exist
              const result = await getUser(user);
              if (result.statusCode === 404) {
                alert('User does not exist');
                localStorage.removeItem('user');
                setUser(null);
                navigate('/');
                return;
              }
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
    
    const logOut = async () => {
        let confirm = window.confirm('Are you sure you want to log out?\nAll your data will be lost');
        if (!confirm) return;
        try {
            // setIsLoading(true);
            
            await deleteUser(user.myuuid);
            
            localStorage.removeItem('user');
            
            alert('Your account has been successfully deleted');
            
            window.location.reload();
        } catch (error) {
            console.error('Error during logout:', error);
            
            alert('There was a problem deleting your account. Please try again later.');
            
            // localStorage.removeItem('user');
            // window.location.reload();
        } finally {
            // setIsLoading(false);
        }
    };
    
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
                {
                     window.location.pathname == "/profile" ? 
                     <PencilLine size={35} onClick={changeName} aria-label="Edit name" /> : null
                }

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