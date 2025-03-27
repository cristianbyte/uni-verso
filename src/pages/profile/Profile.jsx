import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { submitCode } from '../../services/pairingService/submitCode';
import { useSound } from '../../hooks/useSound';
import { showAlert } from '../../components/alert/alertService';
import CustomPopup from "../../components/customPopup/CustomPopup";
import Pairings from '../../components/pairings/Pairings';
import Banner from '../../components/banner/Banner';
import Frame from '../../components/frame/Frame';
import Button from '../../components/button/Button';
import './profile.css';

function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
      if (!user || !user.nickname || !user.profileImage) {
          navigate("/");
      }
  }, [user, navigate]);

  const handleCodeSubmit = async (code) => {
      console.log("Código ingresado:", code);
      try{
          const response = await submitCode( user,code);
          if (response.status === 200){
            setIsPopupOpen(false);
            showAlert("CODE SUCCESS", "success");
            setUser({
              ...user,
              pairings: [...user.pairings, response]
            });
          }else if (response.status === 400){
            showAlert("THE CODE HAS ALREADY BEEN USED", "error");
          }else if(response.status === 404){
            showAlert("WRONG CODE", "error");
          }else{
            showAlert("UNKNOWN ERROR", "error");
        }

      }catch{
        console.log("Error al ingresar código");

      }

  };

    return (
      <div className="profile vanish">
          <Banner />
          <div className="profile__frame">
              <Frame src={user.profileImage} text={user.nickname} />
          </div>
          <div className="profile__content">
              <div className="profile__options--game">
                  <Button className="secondary" type="submit" text="Create Game" to={"/create"} />
                  <Button className="secondary" type="button" text="Insert Code" onClick={() => setIsPopupOpen(true)} />
              </div>

              <Pairings pairings={user.pairings} />
          </div>

          <CustomPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onSubmit={handleCodeSubmit} />
      </div>
  );
}

export default Profile;