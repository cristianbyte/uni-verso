import { useNavigate } from 'react-router-dom';
import './button.css'

const Button = ({ 
  text, 
  icon, 
  onClick, 
  to, 
  type = "button", 
  className = "button-primary text-style-1",
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
      className={`button ${className}`}
      disabled={disabled}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {text && <span className="button-text">{text}</span>}
    </button>
  );
};

export default Button;