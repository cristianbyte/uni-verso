import { useNavigate } from 'react-router-dom';
import './button.css'

const Button = ({ 
  text, 
  icon, 
  onClick, 
  to, 
  type = "button", 
  className = "button-primary",
  disabled = false
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (to) {
      // Navigate to specified route
      navigate(to);
    }
    
    // If onClick function provided, execute it
    if (onClick) {
      onClick(e);
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