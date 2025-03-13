import { PencilLine, LogOut, Volume2 } from 'lucide-react';
import { UserContext } from '../../context/UserContext';
import Frame from '../frame/Frame';
import './banner.css';

const Banner = ({ viewText, options=[true,true,true] }) => {
    const logOut = () => {
        let confirm = window.confirm('Are you sure you want to log out?\nAll your data will be lost');
        if (!confirm) return;
        localStorage.removeItem('user');
        window.location.reload();
    }

    const changeName = () => {
        let newName = prompt('Enter your new name', JSON.parse(localStorage.getItem('user')).nickname);
        if (!newName) return;
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), nickname: newName }));
        window.location.reload();
    }

    return (
        <div className="banner">
            <h1>{viewText}</h1>
            <div className="banner_options">
                {options[0] && <LogOut size={35} onClick={logOut} aria-label="Log Out" />}
                {options[1] && <PencilLine size={35} onClick={changeName} aria-label="Edit name" />}
                {options[2] && <Volume2 size={35} />}
            </div>
        </div>
    );
}

export default Banner;