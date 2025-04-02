import React, { useEffect, useState, useRef, useContext } from "react"; // Añadido useRef
import { UserContext } from "../../context/UserContext.jsx";
import { processLyrics } from "../../utils/processLyrics.js";
import ProgressLoader from "../../components/loader/ProgressLoader.jsx";
import SongPlayer from "../../components/songPlayer/SongPlayer.jsx";
import fetchUrl from "../../services/fetchUrl.js";
import Frame from "../../components/frame/Frame.jsx";
import GameLyics from "./GameLyrics.jsx";
import GameSelector from "./GameSelector.jsx";
import "./game.css";

const GameContent = ({ songData }) => {
  const { user, setUser } = useContext(UserContext);
  const [verseList, setVerseList] = useState([]);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const totalVerses = songData.verseCount;
  
  useEffect(() => {
    console.log(songData);
    setUser((prevUser) => ({
      ...prevUser,
      soundEnabled: false,
    }));
  }, []);
  
  useEffect(() => {
    const loadLyrics = async () => {
      try {
        const lyricsData = await fetchUrl(songData.lyricsApiUrl);
        const verses = processLyrics(lyricsData.lyrics);
        const formattedVerses = verses.map((text, index) => ({
          id: index,
          text,
          status: false,
        }));

        setVerseList(formattedVerses);

      } catch (error) {
        console.error("Error cargando las letras:", error);
      }
    };

    loadLyrics();
  }, [songData.lyricsApiUrl]);

  // update progress bar
  useEffect(() => {
    setProgressPercentage((currentVerse / totalVerses) * 100);
  }, [currentVerse,totalVerses]);

  return (
    <>
      {songData && (
        <div className="game">
          {/* Display song data here */}
          <div className="game__info">
            <div className="info__frame">
              <Frame />
            </div>
            <div className="info__details">
              <h4>{songData.artist}</h4>
              <h4>{songData.title}</h4>
              <h4>
                {currentVerse}/{totalVerses}
              </h4>
              <ProgressLoader value={progressPercentage} />
              <SongPlayer url={songData.preview} className="details__player" />
            </div>
          </div>

          <div className="game__lyrics">{/* <GameLyics /> */}</div>

          <div className="game__selector">
            <GameSelector verseList={verseList} setVerseList={setVerseList} currentVerse={currentVerse} setCurrentVerse={setCurrentVerse} />
          </div>
        </div>
      )}
    </>
  );
};

export default GameContent;
