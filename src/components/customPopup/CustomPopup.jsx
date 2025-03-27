import { useState } from "react";
import {showAlert} from "../../components/alert/alertService";
import "./customPopup.css";

const CustomPopup = ({ isOpen, onClose, onSubmit }) => {
    const [code, setCode] = useState("");

    const handleChange = (e) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        setCode(value);
    };

    const handleSubmit = () => {
        if (!/^[A-Z0-9]{6}$/.test(code)) {
            showAlert("WRONG FORMAT CODE", "error")
            return;
        }

        onSubmit(code);
        setCode("");
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2>Submit code</h2>
                <input
                    type="text"
                    value={code}
                    onChange={handleChange}
                    maxLength={6}
                    placeholder="Ex: A1B2C3"
                />
                <div className="popup-actions">
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="accept" onClick={handleSubmit}>Pair</button>
                </div>
            </div>
        </div>
    );
};

export default CustomPopup;
