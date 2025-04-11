import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Copy } from "lucide-react";
import { showAlert } from "../alert/alertService";
import Button from "../button/Button";
import PairingStats from "../pairingStats/PairingStats";
import SongPlayer from "../songPlayer/SongPlayer";
import Frame from "../frame/Frame";
import alert from "../alert/Alert";

const PairingItem = ({ pair }) => {
    const { user } = useContext(UserContext);
    const handleCopy = (pairingCode) => {
        navigator.clipboard.writeText(pairingCode);
        showAlert("Text copied", "info");
      };
  
    return (
      <div className="pairing">
        <div className="pairing__frames">
          <div className="pairing__frame">
            {pair.pairedUser ? (
              pair.pairedUser.name === user.nickname ? (
                <Frame
                  src={pair.creatorUser.icon}
                  text={pair.creatorUser.name}
                  fontSize={"1rem"}
                />
              ) : (
                <Frame
                  src={pair.pairedUser.icon}
                  text={pair.pairedUser.name}
                  fontSize={"1rem"}
                />
              )
            ) : (
              <Frame />
            )}
          </div>
          <div className="pairing__frame--hide">
            {pair.creatorUser.name === user.nickname ? (
              <Frame
                src={pair.creatorUser.icon}
                text={pair.creatorUser.name}
                fontSize={"1rem"}
              />
            ) : (
              <Frame
                src={pair.pairedUser && pair.pairedUser.icon}
                text={pair.pairedUser && pair.pairedUser.name}
                fontSize={"1rem"}
              />
            )}
          </div>
        </div>
  
        <div
          className="song__info song__info-with-mask"
          style={{ backgroundImage: `url(${pair.song.albumImage})` }}
        >
          <p className="song__code" onClick={() => handleCopy(pair.pairingCode)}>
            CODE: {pair.pairingCode}
            <Copy />
          </p>
          <p className="song__title">
            {pair.song.title} - {pair.song.artist}
          </p>
          {pair.preview && console.log("Preview URL:", pair.preview)}
          <SongPlayer url={pair.song.preview} />
        </div>
      </div>
    );
  };

  export default PairingItem;