import { useContext,useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Banner from '../../components/banner/Banner';
import Frame from '../../components/frame/Frame';
import './profile.css';



function Profile() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!user || !user.nickname || !user.profileImage) {
        navigate('/');
      }
    }, [user, navigate]);

    return (
      <div className='profile'>
        <Banner />
        <div className="profile__frame">
          <Frame src={user.profileImage} text={user.nickname} />
        </div>
      </div>
    );
}

export default Profile;