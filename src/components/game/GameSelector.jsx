import { X, Check } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "../button/Button";

const GameSelector = ({ verseList, setVerseList, currentVerse, setCurrentVerse }) => {
  const [fadeOut, setFadeOut] = useState(false);

  const handleNextVerse = (status) => {
    setFadeOut(true); // Inicia la animación de salida
    setTimeout(() => {
      setFadeOut(false); // Desactiva la animación de salida
      setVerseList((prevList) =>
        prevList.map((verse, index) =>
          index === currentVerse ? { ...verse, status } : verse
        )
      );
      setCurrentVerse((prev) => prev + 1); // Cambia al siguiente verso
    }, 200); // Tiempo de la animación CSS
  };

  return (
    <div className="selector">
      <div className="selector__options">
        <Button
          className="secondary simple cancel no-border"
          icon={<X color="#fff" size={"3rem"} strokeWidth={3} />}
          disabled={!verseList[currentVerse]}
          onClick={() => handleNextVerse(false)}
        />
        <Button
          className="secondary simple accept no-border"
          icon={<Check color="#fff" size={"3rem"} strokeWidth={3} />}
          disabled={!verseList[currentVerse]}
          onClick={() => handleNextVerse(true)}
        />
      </div>
    </div>
  );
};

export default GameSelector;
