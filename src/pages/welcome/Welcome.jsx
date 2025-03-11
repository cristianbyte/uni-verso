import { useContext, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
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
    setUser({
      ...user,
      nickname,
      profileImage: images.find(img => img.id === selectedImage)?.src || "",
    });
    setTimeout(() => navigate('/profile'), 1000);
  };
    
  return (
    <div className="welcome-page">
      <form onSubmit={handleSubmit} className="form">
        {/* Title */}
        <h1 className='vanish' >LessMatch</h1>

        {/* Profile Images */}
        <div className="swiper-container">
          <Swiper
            slidesPerView={1}
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
            onSlideChange={handleSlideChange} // Usamos nuestra función definida aquí
          >
            {images.map((image) => (
              <SwiperSlide key={image.id}>
                <Frame
                  src={image.src}
                  text={nickname}
                  alt={`Profile ${image.id}`}
                  isSelected={image.id === selectedImage} // Pasamos si es seleccionada
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
        <Button className='primary vanish' type="submit" text="Continue" disabled={!nickname} />
      </form>
    </div>
  );
}

export default Welcome;