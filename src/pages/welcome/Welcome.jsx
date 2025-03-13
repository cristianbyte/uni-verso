import { useContext, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { v4 as uuidv4 } from 'uuid';
import { EffectCards } from 'swiper/modules';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { vanish } from '../../utils/vanishEffect';
import Frame from '../../components/frame/Frame';
import Button from '../../components/button/Button';
import 'swiper/swiper-bundle.css';
import './welcome.css';

function Welcome() {
  const { user, setUser } = useContext(UserContext);
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(1);

  const images = [
    { id: 1, src: "/images/pikachu.png" },
    { id: 2, src: "/images/spider.png" },
    { id: 3, src: "/images/cowboy.png" },
    { id: 4, src: "/images/crab.png" },
    { id: 5, src: "/images/toad.png" },
  ];

  const handleSlideChange = (swiper) => {
    setSelectedImage(swiper.activeIndex + 1); // Sumamos 1 porque el índice de Swiper empieza desde 0
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    vanish();
    const myuuid = uuidv4();
    const selectedImageSrc = images.find(img => img.id === selectedImage)?.src;
    
    const isRedirecting = true;
    
    if (selectedImageSrc) {
      setUser({
        ...user,
        nickname,
        myuuid,
        profileImage: selectedImageSrc,
        _isRedirectingFromSubmit: true 
      });
    }
    
    setTimeout(() => {
      navigate('/profile');
    }, 400);
  };
  
  useEffect(() => {
    if (user && user.nickname && user.profileImage && user._isRedirectingFromSubmit) {
      navigate('/profile');
    }
  }, [user, navigate]);
  
    
  return (
    <div className="welcome-page vanish">
      <form onSubmit={handleSubmit} className="form">
        {/* Title */}
        <h1 >LessMatch</h1>

        {/* Profile Images */}
        <div className="swiper-container">
          <Swiper
            slidesPerView={1}
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            onSlideChange={handleSlideChange}
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <Frame
                  src={image.src}
                  text={nickname}
                  alt={`Profile ${image.id}`}
                  isSelected={image.id === selectedImage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* NickName */}
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="Nickname"
          required
        />

        {/* Submit */}
        <Button className='primary' type='submit' text="Continue" disabled={!nickname} />
      </form>
    </div>
  );
}

export default Welcome;