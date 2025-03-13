import { useNavigate } from 'react-router-dom';
import { useSound } from '../../hooks/useSound';
import { vanish } from '../../utils/vanishEffect.js'
import './button.css'

const Button = ({ 
  text, 
  icon, 
  to, 
  type = "button", 
  className = "button-primary",
  disabled = false
}) => {
  const navigate = useNavigate();
  const buttonSound = useSound('button');

  const handleClick = (e) => {
    if (to) {
      // Apply effect
      buttonSound.play();
      vanish();
      setTimeout(() => {
        navigate(to);
      }, 400);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button-${className}`}
      disabled={disabled}
    >
      {icon && <span className="button__icon" >{icon}</span>}
      {text && <span >{text}</span>}
    </button>
  );
};

export default Button;