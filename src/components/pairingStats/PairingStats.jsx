import { getPairingDataByCode } from "../../services/songService/getPairingDataByCode.js";
import { UserContext } from "../../context/UserContext";
import { processLyrics } from "../../utils/processLyrics.js";
import { useContext } from "react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { showAlert } from "../alert/alertService";
import PieChart from "../charts/pie.jsx";
import fetchUrl from "../../services/fetchUrl.js";
import "./pairingStats.css";

const Loading = () => <div className="game__loading"></div>;

const PairingStats = ({ pairingCode }) => {
  const { user } = useContext(UserContext);
  const [verses, setVerses] = useState([]);
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = async () => {
    if (data) {
      setIsOpen(!isOpen);
      return;
    }

    try {
      const response = await getPairingDataByCode(user, pairingCode);

      if (
        response.creatorLines.length == 0 ||
        response.pairedLines.length == 0
      ) {
        showAlert("No stats available yet", "info");
        return;
      }

      setData(response);
      console.log("fetched data", response);
      const fetch = await fetchUrl(response.song.lyricsApiUrl)
      console.log(fetch);
      setVerses(processLyrics(fetch.lyrics));
      console.log(verses);

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
                  text={data.pairingScore.connectionScore.toFixed(1)  + "%"}
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
              <div className="lines">
                {!verses ? (
                  <Loading />
                ) : (
                  verses.map((line, index) => (
                    <div
                      key={index}
                      className={`line ${
                        data.creatorLines[index] && data.pairedLines[index]
                          ? "selected-both"
                          : data.creatorLines[index]
                          ? "selected-me"
                          : data.pairedLines[index]
                          ? "selected-you"
                          : ""
                      }`}
                    >
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PairingStats;
