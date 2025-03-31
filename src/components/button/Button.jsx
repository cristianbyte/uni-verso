import { useNavigate } from 'react-router-dom';
import { useSound } from '../../hooks/useSound';
import { vanish } from '../../utils/vanishEffect.js'
import './button.css'

const Button = ({ 
  text, 
  icon,
  onClick, 
  to, 
  ref,
  type = "button", 
  className = "button-primary",
  disabled = false
}) => {
  const navigate = useNavigate();
  const buttonSound = useSound('button');

  const handleClick = (e) => {
    if(disabled) return;
    if (onClick) onClick();
    buttonSound.play();
    if (to) {
      // Apply effect
      vanish();
      disabled = true;
      setTimeout(() => {
        navigate(to);

      }, 400);
    }
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={handleClick}
      className={`button-${className}`}
      disabled={disabled}
    >
      {icon && <>{icon}</>}
      {text && <p>{text}</p>}
    </button>
  );
};

export default Button;