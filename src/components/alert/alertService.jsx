import { createRoot } from "react-dom/client";
import Alert from "./Alert";

export const showAlert = (message, type = "info", duration = 3000) => {
    const alertContainer = document.createElement("div");
    document.body.appendChild(alertContainer);

    const root = createRoot(alertContainer);

    const removeAlert = () => {
        setTimeout(() => {
            root.unmount();
            document.body.removeChild(alertContainer);
        }, 500);
    };

    root.render(<Alert message={message} type={type} duration={duration} onClose={removeAlert} />);
};
