import { getPairingDataByCode } from "../../services/songService/getPairingDataByCode.js";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { showAlert } from "../alert/alertService";
import "./pairingStats.css";
import PieChart from "../charts/pie.jsx";

const Loading = () => <div className="game__loading"></div>;

const PairingStats = ({ pairingCode }) => {
  // fectch data from the server
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = async () => {
    if (data) {
      setIsOpen(!isOpen);
      return;
    }
  
    try {
      const response = await getPairingDataByCode(user, pairingCode);
  
      if (!response.pairingScore || !response.creatorUser || !response.pairedUser) {
        showAlert("No stats available yet", "info");
        return;
      }
  
      setData(response);
      setIsOpen(true);
    } catch (error) {
      showAlert("Failed to fetch data.", "error");
    }
  };
  

  return (
    <div className={`stats ${isOpen ? "open" : ""}`} id="stats">
      <div
        className={`stats__arrow ${isOpen ? "down" : ""}`}
        onClick={handleOpen}
      >
        <ChevronDown className={`icon ${isOpen ? "rotate-180" : ""}`} />
      </div>
      <div className="stats__info">
        {!data ? (
          <Loading />
        ) : (
          <div className="stats__content">
            <div className="title">
              {data.song.title} - {data.song.artist}
            </div>
            <div className="stats__score">
              <div className="score">
                <PieChart
                  value={data.pairingScore.connectionScore}
                  total={100}
                  text={data.pairingScore.connectionScore + "%"}
                />
                <h6>
                  Match <br /> Percentage
                </h6>
              </div>
              <div className="score">
                <PieChart
                  value={data.pairingScore.selectedVerses}
                  total={data.creatorLines.length}
                  text={
                    data.pairingScore.selectedVerses +
                    "/" +
                    data.creatorLines.length
                  }
                />
                <h6>
                  Verses <br /> Selected
                </h6>
              </div>
            </div>
            <div className="stats__you-and-me">
              <div className="me">{data.creatorUser.name}</div>
              <div className="you">{data.pairedUser.name}</div>
            </div>
            <div className="stats__lines">
              <h6>Verses</h6>
              <div className="lines"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PairingStats;
