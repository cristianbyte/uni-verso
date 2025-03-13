import { useContext,useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/Banner';
import Frame from '../../components/frame/Frame';
import './profile.css';
import Button from '../../components/button/Button';
import { useSound } from '../../hooks/useSound';


function Profile() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // const bgMusic = useSound('stateGame', { autoPlay: true, loop: true, volume: 0.7 });

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
        <div className="profile__options">
          <Button className='primary' type="submit" text="Create Game" to={"/create"} />
          <Button className='primary' type="submit" text="Insert Code" to={"/create"} />
        </div>
      </div>
    );
}

export default Profile;