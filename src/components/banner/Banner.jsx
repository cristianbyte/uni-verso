import { PencilLine, LogOut } from 'lucide-react';
import './banner.css';

const Banner = ({ viewText }) => {

    const logOut = () => {
        localStorage.removeItem('user');
        window.location.reload();
    }

    return (
        <div className="banner">
            <h1>{viewText}</h1>
            <div className="banner_options">
                <PencilLine size={35}  />
                <LogOut size={35} onClick={logOut} />
            </div>
        </div>
    );
}

export default Banner;