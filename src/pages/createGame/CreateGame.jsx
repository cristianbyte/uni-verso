import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useSound } from '../../hooks/useSound';
import { vanish } from '../../utils/vanishEffect';
import { processLyrics } from '../../utils/processLyrics.js';
import fetchSuggestions from '../../services/fetchSuggestion';
import fetchLyrics from '../../services/fetchLyrics';
import SongPreview from '../../components/songPreview/SongPreview';
import Frame from '../../components/frame/Frame';
import Button from '../../components/button/Button';
import Banner from '../../components/banner/Banner';
import './createGame.css';
import IframeDeezer from '../../components/iframe/iframeDeezer';
import SongPlayer from '../../components/songPlayer/SongPlayer';

const CreateGame = () => {

    const {user} = useContext(UserContext);
    const [search, setSearch ] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [songSelected, setSongSelected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [song, setSong] = useState('');
    const navigate = useNavigate();
    
    const buttonSound = useSound('button');
    //const bgMusic = useSound('stateMatch', { autoPlay: true, loop: true, volume: 0.3 });
    // Play background music when component mounts
    // useEffect(() => {
    //     bgMusic.play();
    //     // Cleanup when component unmounts
    //     return () => bgMusic.stop();
    // }, []);

    useEffect(() => {
        if (!user || !user.nickname || !user.profileImage) {
          navigate('/');
        }
      }, [user, navigate]);
    
    const handleBack = () => {
        vanish();
        buttonSound.play();
        setTimeout(()=>{
            navigate('/profile');
        },400)
    }

    const handleSubmit = async () => {
        if (!search) return;
        setLoading(true)
        try{
            const result = await fetchSuggestions(search);
            setSuggestions(result.data || []);
            // when new song is performed
            setSongSelected(false);
            setSong(null);
        }catch (err){
            console.log("Error: ", err.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const getLyrics = async () => {
            if (song && !song.lyrics) {
                setLoading(true);
                try {
                    const lyrics = await fetchLyrics(song.artist.name, song.title);
                    const verseList = processLyrics(lyrics);
                    setSong(prevSong => ({
                        ...prevSong,
                        lyrics: verseList
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
        console.log('Success!');
    };


    return (
        <div className='create vanish'>
            <Banner viewText='New Game' options={[true,false,true,true]} back={handleBack} />
            <div className="create__frame">
                <Frame src={user.profileImage} text={user.nickname} fontSize={"1rem"} />
                <Frame src={"/images/question.png"} />
            </div>

            <div className="create__container">

                <input className="input"
                    placeholder="Search Song"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
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
                        />
                    ) : loading ? (
                        <p>Loading...</p>
                    ) : (
                        suggestions.length > 0 && (
                            <div className='create__suggestions'>
                                {suggestions.map((suggestion, index) => (
                                    <p 
                                        className='song' 
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
            {/* <IframeDeezer trackId={song.id} /> */}
            { songSelected && song && (
                <SongPlayer url={song.preview} />
            )}
            <Button className='primary abs-end' text="Select song" disabled={!songSelected} />
        
        </div>
    );
}

export default CreateGame;