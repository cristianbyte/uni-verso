import React, { useEffect, useState } from "react";
import ProgressLoader from "../../components/loader/ProgressLoader.jsx";
import { getByCode } from "../../services/songService/getByCode.js";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "./game.css";
import Frame from "../../components/frame/Frame.jsx";
import SongPlayer from "../../components/songPlayer/SongPlayer.jsx";


const Loading = () => <div className="game__loading"></div>;

const GameContent = ({ songData }) => {
  const [verseProgress, setVerseProgress] = useState(0);
  const [versesSelected, setVersesSelected] = useState(5);
  const totalVerses = songData.verseCount;
  
  useEffect(() => {
    setVerseProgress((versesSelected / totalVerses)*100);
  }, [versesSelected, totalVerses]);

  return (
    <>
      {/* <h2 >UniVerso</h2> */}
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
              <h4>{versesSelected}/{totalVerses}</h4>
              <ProgressLoader value={verseProgress} />
              <SongPlayer className="details__player" />
            </div>
          </div>
          <div className="game__lyrics">

          </div>
          <div className="game__selector">
            
          </div>
        </div>
      )}
    </>
  );
};

const Game = ({ codeGame = "1D4BVB" }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getByCode(user, codeGame);

        setSongData(response);
        console.log(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching song:", error);
        setIsLoading(false);
      }
    };

    fetchSong();
  }, [codeGame, user]);

  return (
    <div className="game__container">
      {isLoading ? <Loading /> : <GameContent songData={songData} />}
    </div>
  );
};

export default Game;
