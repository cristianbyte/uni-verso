import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { getPairingDataByCode } from "../../services/songService/getPairingDataByCode.js";
import { UserContext } from "../../context/UserContext";
import GameContent from "../../components/game/GameContent";

const Loading = () => <div className="game__loading"></div>;

const Game = () => {
  const { pairingCode } = useParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getPairingDataByCode(user, pairingCode);

        setSongData(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching song:", error);
        setIsLoading(false);
      }
    };

    fetchSong();
  }, []);

  return (
    <div className="game__container">
      {isLoading ? <Loading /> : <GameContent songData={songData} />}
    </div>
  );
};

export default Game;
