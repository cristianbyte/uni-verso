import { useContext,useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../hooks/useSound';
import Pairings from '../../components/pairings/Pairings';
import Banner from '../../components/banner/Banner';
import Frame from '../../components/frame/Frame';
import Button from '../../components/button/Button';
import './profile.css';

function Profile() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    //const bgMusic = useSound('stateGame', { autoPlay: true, loop: true, volume: 0.3 });

    useEffect(() => {
      if (!user || !user.nickname || !user.profileImage) {
        navigate('/');
      }
    }, [user, navigate]);

    return (
      <div className='profile vanish'>
        <Banner />
        <div className="profile__frame">
            <Frame src={user.profileImage} text={user.nickname} />
        </div>
        <div className="profile__content">
          <div className="profile__options--game">
            <Button className='secondary' type="submit" text="Create Game" to={"/create"} />
            <Button className='secondary' type="submit" text="Insert Code" to={"/create"} />
          </div>

          <Pairings pairings = {user.pairings} />
        </div>
      </div>
    );
}

export default Profile;