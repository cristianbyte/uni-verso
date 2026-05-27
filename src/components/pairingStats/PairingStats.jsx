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

const Loading = () => <div className="stats__loading"></div>;

const calculatePairingMetrics = (creatorLines, pairedLines) => {
  const totalVerses = Math.min(creatorLines.length, pairedLines.length);
  let creatorPickCount = 0;
  let pairedPickCount = 0;
  let matchedVerseCount = 0;
  let selectedByEitherCount = 0;
  let creatorOnlyCount = 0;
  let pairedOnlyCount = 0;

  for (let verseIndex = 0; verseIndex < totalVerses; verseIndex++) {
    const isCreatorPick = Boolean(creatorLines[verseIndex]);
    const isPairedPick = Boolean(pairedLines[verseIndex]);

    if (isCreatorPick) creatorPickCount++;
    if (isPairedPick) pairedPickCount++;
    if (isCreatorPick || isPairedPick) selectedByEitherCount++;
    if (isCreatorPick && isPairedPick) matchedVerseCount++;
    if (isCreatorPick && !isPairedPick) creatorOnlyCount++;
    if (!isCreatorPick && isPairedPick) pairedOnlyCount++;
  }

  const affinityScore = selectedByEitherCount
    ? (matchedVerseCount / selectedByEitherCount) * 100
    : 0;

  const sharedCoverageScore = totalVerses
    ? (matchedVerseCount / totalVerses) * 100
    : 0;

  return {
    totalVerses,
    creatorPickCount,
    pairedPickCount,
    matchedVerseCount,
    selectedByEitherCount,
    creatorOnlyCount,
    pairedOnlyCount,
    affinityScore,
    sharedCoverageScore,
  };
};

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

      if (!response.creatorLines?.length || !response.pairedLines?.length) {
        showAlert("No stats available yet", "info");
        return;
      }

      setData(response);
      const fetch = await fetchUrl(response.song.lyricsApiUrl);
      setVerses(processLyrics(fetch.lyrics));

      setIsOpen(true);
    } catch (error) {
      showAlert(error.message || "Failed to fetch data.", "error");
    }
  };

  const metrics = data
    ? calculatePairingMetrics(data.creatorLines, data.pairedLines)
    : null;

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
                  value={metrics.affinityScore}
                  total={100}
                  text={metrics.affinityScore.toFixed(1)  + "%"}
                />
                <h6>
                  Afinidad <br /> emocional
                </h6>
              </div>
              <div className="score">
                <PieChart
                  value={metrics.matchedVerseCount}
                  total={metrics.totalVerses}
                  text={
                    metrics.matchedVerseCount +
                    "/" +
                    metrics.totalVerses
                  }
                />
                <h6>
                  Versos <br /> en común
                </h6>
              </div>
            </div>
            <div className="stats__summary">
              <div className="stats__metric-card">
                <span>Seleccionados por alguno</span>
                <strong>{metrics.selectedByEitherCount}/{metrics.totalVerses}</strong>
              </div>
              <div className="stats__metric-card">
                <span>Cobertura compartida</span>
                <strong>{metrics.sharedCoverageScore.toFixed(1)}%</strong>
              </div>
              <div className="stats__metric-card">
                <span>Solo {data.creatorUser.name}</span>
                <strong>{metrics.creatorOnlyCount}</strong>
              </div>
              <div className="stats__metric-card">
                <span>Solo {data.pairedUser.name}</span>
                <strong>{metrics.pairedOnlyCount}</strong>
              </div>
            </div>
            <div className="stats__you-and-me">
              <div className="me">{data.creatorUser.name}: {metrics.creatorPickCount}</div>
              <div className="you">{data.pairedUser.name}: {metrics.pairedPickCount}</div>
            </div>
            <div className="stats__lines">
              <h6>Versos</h6>
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
