import React, { useEffect, useState, useContext } from "react";
import { getByCode } from "../../services/songService/getByCode.js";
import { UserContext } from "../../context/UserContext";
import GameContent from "../../components/game/GameContent";

const Loading = () => <div className="game__loading"></div>;

const Game = ({ codeGame = "1D4BVB" }) => {
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [songData, setSongData] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await getByCode(user, codeGame);

        setSongData(response);
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
