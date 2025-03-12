import { PencilLine, LogOut } from 'lucide-react';
import './banner.css';

const Banner = ({ viewText }) => {

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
                <PencilLine size={35} onClick={changeName} />
                <LogOut size={35} onClick={logOut} />
            </div>
        </div>
    );
}

export default Banner;