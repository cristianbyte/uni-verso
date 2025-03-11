import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import './profile.css';

function Profile() {
    const { user } = useContext(UserContext);

    return (
      <div>
        <h1>Bienvenido, {user.nickname}!</h1>
        <img src={user.profileImage} alt="Avatar seleccionado" />
      </div>
    );
}

export default Profile;