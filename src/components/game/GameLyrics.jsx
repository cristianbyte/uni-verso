import { useState } from "react";

const GameLyics = ({lyrics , actual}) => {

    const [currentVerse, setCurrentVerse] = useState(actual || 0);

    return (
        <>
            {lyrics && lyrics.map((verse, index) => {
                return (
                    <div className={index > currentVerse ? 'no-display' : ''} >
                        {verse}
                    </div>
                )
            })}
        </>
    )
}

export default GameLyics;