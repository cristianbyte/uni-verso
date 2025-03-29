import React, { useEffect, useState } from "react";
import { getByCode } from "../../services/songService/getByCode.js"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../../components/button/Button";
import "./game.css";

const Starting = ({ onStartGame, isLoading }) => {
  return (
    <div className="game__start">
      {isLoading ? <div className="game__loading"></div> : ""}
      <Button
        className="primary simple"
        text="Start Game"
        onClick={onStartGame}
        disabled={isLoading}
      />
    </div>
  );
};

const GameContent = () => {
  return (
    <div className="game__content">
      <h2>Game Area</h2>
      {/* Add your game elements here */}
    </div>
  );
};

const Game = ({ codeGame= "N5VXHQ" }) => {
  const { user, setUser } = useContext(UserContext);
  const [isStarting, setIsStarting] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [songData, setSongData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchSong = async () => {
      // Prevent multiple concurrent requests
      if (isFetching || songData !== null) return;

      try {
        setIsFetching(true);
        const response = await getByCode(user, codeGame);
        setSongData(response);
        setIsLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching song:", error);
        setIsLoading(false);
      } finally {
        setIsFetching(false);
      }
    };

    fetchSong();
  }, [codeGame, user, isFetching, songData]);

  const handleStartGame = () => {
    setIsLoading(false);
    setIsStarting(false);
  };

  return (
    <div className="game">
      {isStarting ? (
        <Starting onStartGame={handleStartGame} isLoading={isLoading} />
      ) : (
        <GameContent />
      )}
    </div>
  );
};

export default Game;
