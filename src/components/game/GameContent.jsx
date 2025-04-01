import React, { useEffect, useState, useRef, useContext } from "react"; // Añadido useRef
import { UserContext } from "../../context/UserContext.jsx";
import { X, Check } from "lucide-react";
import ProgressLoader from "../../components/loader/ProgressLoader.jsx";
import SongPlayer from "../../components/songPlayer/SongPlayer.jsx";
import fetchUrl from "../../services/fetchUrl.js";
import Button from "../../components/button/Button";
import Frame from "../../components/frame/Frame.jsx";
import "./game.css";
import { processLyrics } from "../../utils/processLyrics.js";

const GameContent = ({ songData }) => {
  // Crear una referencia para el elemento selector__verse

  // Estados para manejar los versos y la progresión del juego
  const { user, setUser } = useContext(UserContext);
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [processedVerses, setProcessedVerses] = useState(0);
  const [verseSelections, setVerseSelections] = useState([]); // Array de booleanos (true=aceptado, false=rechazado)
  const [versesList, setVersesList] = useState([]); // Lista de versos procesados
  const [displayedVerses, setDisplayedVerses] = useState([]); // Versos ya procesados para mostrar
  const [currentVerse, setCurrentVerse] = useState(""); // Verso actual en selector
  const [progressPercentage, setProgressPercentage] = useState(0);
  const totalVerses = songData.verseCount;

  // Cargar los versos de la canción al iniciar
  useEffect(() => {
    const loadLyrics = async () => {
      try {
        const lyricsData = await fetchUrl(songData.lyricsApiUrl);
        const verses = processLyrics(lyricsData.lyrics);
        setVersesList(verses);

        // Inicializar la lista de booleanos (todos en falso por defecto)
        setVerseSelections(new Array(verses.length).fill(false));
        const updatedUser = {
          ...user,
          soundEnabled: false,
        };

        setUser(updatedUser);
        // Establecer el primer verso como actual
        if (verses.length > 0) {
          setCurrentVerse(verses[0]);
        }
      } catch (error) {
        console.error("Error cargando las letras:", error);
      }
    };

    loadLyrics();
  }, [songData.lyricsApiUrl]);

  // Efecto para hacer scroll al fondo del selector__verse cuando cambia el verso actual
  useEffect(() => {
    if (selectorVerseRef.current) {
      selectorVerseRef.current.scrollTop =
        selectorVerseRef.current.scrollHeight;
    }
  }, [currentVerse]);

  // Efecto para hacer scroll al fondo del contenedor de lyrics cuando se añaden nuevos versos
  useEffect(() => {
    if (lyricsContainerRef.current) {
      lyricsContainerRef.current.scrollTop =
        lyricsContainerRef.current.scrollHeight;
    }
  }, [displayedVerses]);

  // Actualizar el porcentaje de progreso
  useEffect(() => {
    setProgressPercentage((processedVerses / totalVerses) * 100);
  }, [processedVerses, totalVerses]);

  // Función para manejar la selección de versos (aceptar/rechazar)
  const lyricsContainerRef = useRef(null);
  const selectorVerseRef = useRef(null);

  // Modifica la función handleVerseSelection para manipular el DOM directamente
  const handleVerseSelection = (isAccepted) => {
    if (currentVerseIndex >= versesList.length) return;
    
    // Actualizar el estado de selección para este verso
    const updatedSelections = [...verseSelections];
    updatedSelections[currentVerseIndex] = isAccepted;
    setVerseSelections(updatedSelections);
    
    // Crear el nuevo elemento para el verso seleccionado
    if (lyricsContainerRef.current && currentVerse) {
      // Crear un nuevo elemento div
      const newVerseElement = document.createElement('div');
      newVerseElement.textContent = currentVerse;
      newVerseElement.className = `verse verse-enter ${isAccepted ? 'verse--accepted' : 'verse--rejected'}`;
      
      // Añadirlo al contenedor de lyrics
      lyricsContainerRef.current.appendChild(newVerseElement);
      
      // Hacer scroll hasta el nuevo elemento
      lyricsContainerRef.current.scrollTop = lyricsContainerRef.current.scrollHeight;
    }
    
    // Incrementar el contador de versos procesados
    setProcessedVerses(prev => prev + 1);
    
    // Pasar al siguiente verso
    if (currentVerseIndex < versesList.length - 1) {
      setCurrentVerseIndex(prev => prev + 1);
      
      // Actualizar el texto del selector con animación
      if (selectorVerseRef.current) {
        // Primero hacemos que desaparezca
        selectorVerseRef.current.classList.add('verse-exit');
        
        // Después de la animación de salida, cambiamos el contenido
        setTimeout(() => {
          setCurrentVerse(versesList[currentVerseIndex + 1]);
          selectorVerseRef.current.classList.remove('verse-exit');
          selectorVerseRef.current.classList.add('verse-enter');
          
          // Eliminamos la clase de entrada después de la animación
          setTimeout(() => {
            selectorVerseRef.current.classList.remove('verse-enter');
          }, 500);
        }, 300);
      } else {
        setCurrentVerse(versesList[currentVerseIndex + 1]);
      }
    } else {
      // No hay más versos
      setCurrentVerse('');
    }
  };

  return (
    <>
      {songData && (
        <div className="game">
          {/* Display song data here */}
          <div className="game__info">
            <div className="info__frame">
              <Frame />
            </div>
            <div className="info__details">
              <h4>{songData.artist}</h4>
              <h4>{songData.title}</h4>
              <h4>
                {processedVerses}/{totalVerses}
              </h4>
              <ProgressLoader value={progressPercentage} />
              <SongPlayer url={songData.preview} className="details__player" />
            </div>
          </div>

          {/* Área donde se acumulan los versos ya procesados */}
          <div className="game__lyrics" ref={lyricsContainerRef}></div>

          {/* Selector para el verso actual */}
          <div className="game__selector">
            <div className="selector">
                <div 
                className="selector__verse" 
                ref={selectorVerseRef}
                >
                {currentVerse || "Cargando versos..."}
                </div>
                <div className="selector__options">
                {/* Botones existentes... */}
            <Button
              className="secondary simple cancel no-border"
              icon={<X color="#fff" size={"3rem"} strokeWidth={3} />}
              onClick={() => handleVerseSelection(false)}
              disabled={!currentVerse}
            />
            <Button
              className="secondary simple accept no-border"
              icon={<Check color="#fff" size={"3rem"} strokeWidth={3} />}
              onClick={() => handleVerseSelection(true)}
              disabled={!currentVerse}
                />
                </div>
            </div>
            </div>
        </div>
      )}
    </>
  );
};

export default GameContent;
