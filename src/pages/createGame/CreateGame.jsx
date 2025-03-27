import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useSound } from "../../hooks/useSound";
import { vanish } from "../../utils/vanishEffect";
import { processLyrics } from "../../utils/processLyrics.js";
import { createPairing } from "../../services/pairingService/createPairing.js";
import fetchSuggestions from "../../services/fetchSuggestion";
import fetchLyrics from "../../services/fetchLyrics";
import SongPreview from "../../components/songPreview/SongPreview";
import Frame from "../../components/frame/Frame";
import Button from "../../components/button/Button";
import Banner from "../../components/banner/Banner";
import IframeDeezer from "../../components/iframe/iframeDeezer";
import SongPlayer from "../../components/songPlayer/SongPlayer";
import "./createGame.css";

const CreateGame = () => {
  const { user, setUser } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [songSelected, setSongSelected] = useState(false);
  const [pairingCode, setPairingCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [song, setSong] = useState("");
  const navigate = useNavigate();

  const buttonSound = useSound("button");

  const handleRequest = async () => {
    try{
      const response = await createPairing(user, song);
      setUser({
        ...user,
        pairings: [...user.pairings, response]
      })
      setPairingCode(response.pairingCode);
      console.log(response);
      navigate('/profile')
    }catch{
      console.log("Error creating pairing");
      setPairingCode("");
    }
  };

  useEffect(() => {
    if (!user || !user.nickname || !user.profileImage) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleBack = () => {
    vanish();
    buttonSound.play();
    setTimeout(() => {
      navigate("/profile");
    }, 400);
  };

  const handleSubmit = async () => {
    if (!search) return;
    setLoading(true);
    try {
      const result = await fetchSuggestions(search);
      setSuggestions(result.data || []);
      // when new song is performed
      setSongSelected(false);
      setSong(null);
    } catch (err) {
      console.log("Error: ", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLyrics = async () => {
      if (song && !song.lyrics) {
        setLoading(true);
        try {
          const lyrics = await fetchLyrics(song.artist.name, song.title);
          const verseList = processLyrics(lyrics);
          setSong((prevSong) => ({
            ...prevSong,
            lyrics: verseList,
          }));
        } catch (err) {
          console.log("Error fetching lyrics: ", err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    if (songSelected && song) {
      getLyrics();
    }
  }, [songSelected, song]);

  const handleSelection = (index) => {
    buttonSound.play();
    setSong(suggestions[index]);
    console.log(suggestions[index]);
    setSongSelected(true);
  };

  return (
    <div className="create vanish">
      <Banner viewText="New Game" back={handleBack} />
      <div className="create__frame">
        <Frame src={user.profileImage} text={user.nickname} fontSize={"1rem"} />
        <Frame src={"/images/question.png"} />
      </div>

      <div className="create__container">
        <input
          className="input"
          placeholder="Search Song"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />

        {songSelected && song ? (
          <SongPreview
            codImg={song.md5_image}
            title={song.title}
            artist={song.artist.name}
            lyrics={song.lyrics || "Loading lyrics..."}
            verseCount={song.lyrics ? song.lyrics.length : 0}
          />
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          suggestions.length > 0 && (
            <div className="create__suggestions">
              {suggestions.map((suggestion, index) => (
                <p
                  className="song"
                  key={index}
                  onClick={() => handleSelection(index)}
                >
                  {suggestion.artist.name} - {suggestion.title}
                </p>
              ))}
            </div>
          )
        )}
      </div>
      {songSelected && song && <SongPlayer url={song.preview} />}
      <Button
        className="primary abs-end"
        text="Select song"
        disabled={!songSelected || pairingCode !== ""}
        onClick={handleRequest}
      />
    </div>
  );
};

export default CreateGame;
