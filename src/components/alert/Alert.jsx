import { useEffect, useState } from "react";
import "./alert.css";

const Alert = ({ message, type = "info", duration = 3000, onClose }) => {
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const fadeTimeout = setTimeout(() => setIsFading(true), duration - 500);
        const removeTimeout = setTimeout(onClose, duration);

        return () => {
            clearTimeout(fadeTimeout);
            clearTimeout(removeTimeout);
        };
    }, [duration, onClose]);

    return <div className={`alert alert-${type} ${isFading ? "fade-out" : ""}`}>{message}</div>;
};

export default Alert;
