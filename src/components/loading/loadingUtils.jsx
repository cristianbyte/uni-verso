// loadingUtils.js
import { createRoot } from "react-dom/client";
import Loading from "./Loading";

let loadingContainer = null;
let loadingRoot = null;
let activeLoadings = 0;

export const showLoading = () => {
  activeLoadings++;
  
  if (!loadingContainer) {
    loadingContainer = document.createElement("div");
    document.body.appendChild(loadingContainer);
    loadingRoot = createRoot(loadingContainer);
  }
  
  loadingRoot.render(<Loading />);
};

export const hideLoading = () => {
  activeLoadings--;
  
  if (activeLoadings <= 0) {
    activeLoadings = 0;
    
    if (loadingRoot && loadingContainer) {
      loadingRoot.unmount();
      if (loadingContainer.parentNode) {
        document.body.removeChild(loadingContainer);
      }
      loadingContainer = null;
      loadingRoot = null;
    }
  }
};