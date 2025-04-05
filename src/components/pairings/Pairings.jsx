import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import PairingItem from "./PairingItem";
import Button from "../button/Button";
import PairingStats from "../pairingStats/PairingStats";
import "./pairings.css";
import { showAlert } from "../alert/alertService";


const StartGame = (pairing) => {
  console.log("Start Game:", pairing.pairingCode);
  if (pairing.pairedUser && pairing.creatorUser){
    // Start Game
    // Navigate to Game Component
  } else{
    showAlert("You need to be paired with someone \n Try refreshing the page to continue.", "error");
  }
};
const Pairings = ({ pairings }) => {
  const hasPairings = Array.isArray(pairings) && pairings.length > 0;
  console.log("Pairings:", pairings);
  return (
    <div className="pairings">
      <h2>Pairings:</h2>
      <div className="pairings__list">
        {hasPairings ? (
          pairings.map((pair, index) => (
            <div key={index} className="pairings__item">
              <PairingItem pair={pair} />
              {
                <Button
                  text={"Play Now"}
                  className="third simple"
                  disabled={false}
                  onClick={() => StartGame(pair)}
                />
              }

              <PairingStats stats={"none"} />
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
