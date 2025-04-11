import React, { useEffect, useRef } from "react";

const GameLyrics = ({ verseList, currentVerse, setCurrentVerse }) => {
  const versesRef = useRef([]);
  const containerRef = useRef(null);

  // Inicializa el array de refs
  useEffect(() => {
    versesRef.current = verseList.map((_, i) => 
      versesRef.current[i] || React.createRef()
    );
  }, [verseList]);

  // Efecto para hacer scroll al verso actual
  useEffect(() => {
    if (versesRef.current[currentVerse]?.current) {
      versesRef.current[currentVerse].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [currentVerse,setCurrentVerse]);

  return (
    <div ref={containerRef } className="game__lyrics">
        { (verseList && verseList.length > 0) ? 
      verseList.map((verse, index) => (
        <div 
          key={index} 
          ref={versesRef.current[index]}
          onClick={() => setCurrentVerse(index)}
          className={`verse ${verse.status} ${index === currentVerse ? 'current' : ''}`}
        >
          {verse.text}
        </div>
      )) : <div className="game__loading"></div>}
    </div>
  );
};

export default GameLyrics;
