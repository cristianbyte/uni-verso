import { Copy, Play, Pause } from "lucide-react";
import SongPlayer from "../songPlayer/SongPlayer";
import Frame from "../frame/Frame";
import "./pairings.css";

const handleCopy = (pairingCode) => {
  navigator.clipboard.writeText(pairingCode);
  alert("Copied");
}

const PairingItem = ({ pair }) => (
  <div className="pairing">
    <div className="pairing__frames">
      <div className="pairing__frame">
        {pair.pairedUser ? (
          <Frame src={pair.pairedUser.icon} text={pair.pairedUser.className} />
        ) : (
          <Frame />
        )}
      </div>
      <div className="pairing__frame--hide">
        <Frame
          src={pair.creatorUser.icon}
          text={pair.creatorUser.name}
          fontSize={"1rem"}
        />
      </div>
    </div>

    <div
      className="song__info song__info-with-mask"
      style={{ backgroundImage: `url(${pair.song.albumImage})` }}
    >
      <p className="song__code"
        onClick={() => handleCopy(pair.pairingCode)}>
        CODE: {pair.pairingCode}
        <Copy />
      </p>
      <p className="song__title">
        {pair.song.title} - {pair.song.artist}
      </p>
      <p className="song__artist"></p>
      {pair.preview && console.log('Preview URL:', pair.preview)}
      <SongPlayer url={pair.song.preview} />
    </div>
  </div>
);

const Pairings = ({ pairings }) => {
  const hasPairings = Array.isArray(pairings) && pairings.length > 0;

  return (
    <div className="pairings">
      <h2>Pairings:</h2>
      <div className="pairings__list">
        {hasPairings ? (
          pairings.map((pair, index) => (
            <div key={index} className="pairings__item">
              <PairingItem pair={pair} />
            </div>
          ))
        ) : (
          <p>No pairings available</p>
        )}
      </div>
    </div>
  );
};

export default Pairings;
