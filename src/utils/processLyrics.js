export const processLyrics = (lyricsText) => {
    if (!lyricsText) return [];
      
    const normalizedText = lyricsText.replace(/\r\n/g, '\n');
    const verses = normalizedText.split('\n').filter(verse => verse.trim() !== '');
    
    // Procesar cada verso y determinar si se divide por comas
    const processedVerses = verses.map(verse => {
      // No dividir si tiene menos de 10 caracteres
      if (verse.length < 10) return verse;
      
      // Buscar paréntesis para proteger su contenido
      const result = [];
      let currentSegment = '';
      let insideParenthesis = false;
      
      for (let i = 0; i < verse.length; i++) {
        const char = verse[i];
        
        if (char === '(') {
          insideParenthesis = true;
          currentSegment += char;
        } else if (char === ')') {
          insideParenthesis = false;
          currentSegment += char;
        } else if (char === ',' && !insideParenthesis) {
          // Solo dividir por coma si está fuera de paréntesis y cumple con las condiciones
          const segment = currentSegment.trim();
          
          // Verificar si el segmento tiene más de 20 caracteres o al menos 3 palabras
          const wordCount = segment.split(/\s+/).filter(word => word.length > 0).length;
          
          if (segment.length > 20 || wordCount >= 3) {
            result.push(segment);
            currentSegment = '';
          } else {
            currentSegment += char;
          }
        } else {
          currentSegment += char;
        }
      }
      
      // Añadir el último segmento si existe
      if (currentSegment.trim()) {
        result.push(currentSegment.trim());
      }
      
      // Si no se hizo ninguna división, devolver el verso original
      return result.length > 0 ? result : [verse];
    });
    
    // Aplanar el array resultante
    return processedVerses.flat();
  };