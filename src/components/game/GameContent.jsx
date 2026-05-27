import { useCallback, useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import { processLyrics } from "../../utils/processLyrics.js";
import ProgressLoader from "../../components/loader/ProgressLoader.jsx";
import SongPlayer from "../../components/songPlayer/SongPlayer.jsx";
import fetchUrl from "../../services/fetchUrl.js";
import Frame from "../../components/frame/Frame.jsx";
import GameLyics from "./GameLyrics.jsx";
import GameSelector from "./GameSelector.jsx";
import "./game.css";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button.jsx";
import { submitLines } from "../../services/pairingService/submitLines.js";
import { showAlert } from "../alert/alertService.jsx";
import fetchSuggestions from "../../services/fetchSuggestion.js";

const GameContent = ({ songData }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [verseList, setVerseList] = useState([]);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [ pairedPlayer, setPairedPlayer] = useState({});
  const [audioPreviewUrl, setAudioPreviewUrl] = useState(songData.song.preview);
  const [hasRefreshedAudioPreview, setHasRefreshedAudioPreview] = useState(false);
  const [hasHandledAudioError, setHasHandledAudioError] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const totalVerses = songData.song.verseCount;

  const refreshAudioPreview = useCallback(async ({ showUnavailableAlert = false } = {}) => {
    try {
      const searchResult = await fetchSuggestions(`${songData.song.artist} ${songData.song.title}`);
      const matchingSong = searchResult.data?.find((song) => song.id === songData.song.id) || searchResult.data?.[0];

      if (matchingSong?.preview) {
        setAudioPreviewUrl(matchingSong.preview);
        return;
      }

      if (showUnavailableAlert) {
        showAlert("Audio preview is not available for this song", "info");
      }
    } catch (error) {
      console.error("Error loading audio preview fallback:", error.message);
      if (showUnavailableAlert) {
        showAlert("Audio preview could not be loaded", "error");
      }
    }
  }, [songData.song.artist, songData.song.id, songData.song.title]);

  const handleAudioError = useCallback(() => {
    if (hasHandledAudioError) return;

    setHasHandledAudioError(true);
    refreshAudioPreview({ showUnavailableAlert: true });
  }, [hasHandledAudioError, refreshAudioPreview]);
  
  useEffect(() => {
    const isCreator = user.nickname === songData.creatorUser.name;
    const paired = isCreator ? songData.pairedUser : songData.creatorUser;
  
    setPairedPlayer({
      name: paired.name,
      image: paired.icon,
    });
  
    setUser((prevUser) => ({
      ...prevUser,
      soundEnabled: false,
    }));
  }, [setUser, songData.creatorUser, songData.pairedUser, user.nickname]);

  useEffect(() => {
    const loadLyrics = async () => {
      try {
        const lyricsData = await fetchUrl(songData.song.lyricsApiUrl);
        const verses = processLyrics(lyricsData.lyrics);
        console.log(verses);
        const formattedVerses = verses.map((text, index) => ({
          id: index,
          text,
          status: false,
        }));

        setVerseList(formattedVerses);
      } catch (error) {
        console.error("Error loading lyrics:", error);
      }
    };

    loadLyrics();
  }, [songData.song.lyricsApiUrl]);

  useEffect(() => {
    if (!hasRefreshedAudioPreview) {
      setHasRefreshedAudioPreview(true);
      refreshAudioPreview();
    }
  }, [hasRefreshedAudioPreview, refreshAudioPreview]);

  // update progress bar
  useEffect(() => {
    setProgressPercentage(((currentVerse + 1) / totalVerses) * 100);
  }, [currentVerse, totalVerses]);

  // end game
  const handleEnding = async () => {
    try{
      const finalVerseList = verseList.map((verse) => verse.status);
      const response = await submitLines(user, finalVerseList, songData.pairingCode);
      if (response) {
        showAlert("Lines submitted successfully!", "success");
      } else {
        showAlert("Error submitting lines", "error");
      }
      setUser((prevUser) => ({
        ...prevUser,
        soundEnabled: true,
      }));
      navigate("/");
    }
    catch (error) {
      console.error("Error ending game:", error.message);
      showAlert("Ops! something went wrong", "error");
    }
  };

  return (
    <>
      {songData && (
        <div className="game">
          {/* Display song data here */}
          <div className="game__info">
            <div className="info__frame">
              <Frame src={pairedPlayer.image} text={pairedPlayer.name} fontSize={"1rem"} />
            </div>
            <div className="info__details">
              <div className="details__row">
                <div className="details__pic">
                  <img src={songData.song.albumImage} alt="" />
                </div>
                <div className="details__data">
                  <h4>{songData.song.artist}</h4>
                  <h4>{songData.song.title}</h4>
                  <h4>
                    {currentVerse}/{totalVerses}
                  </h4>
                </div>
              </div>
              <ProgressLoader value={progressPercentage} />
              <SongPlayer url={audioPreviewUrl} className="details__player" onError={handleAudioError} />
            </div>
          </div>

          <div className="game__lyrics-area">
            <GameLyics verseList={verseList} currentVerse={currentVerse} setCurrentVerse={setCurrentVerse}/>
          </div>

          <div className="game__selector">
            <GameSelector
              verseList={verseList}
              setVerseList={setVerseList}
              currentVerse={currentVerse}
              setCurrentVerse={setCurrentVerse}
            />
          </div>
          {progressPercentage >= 99 && (
            <div className="game__end">
              <Button text={"End Game"}  className="third simple" onClick={handleEnding}/>
            </div>
            )}
        </div>
      )}
    </>
  );
};

export default GameContent;
