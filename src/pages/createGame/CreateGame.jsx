import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import fetchSuggestions from '../../services/fetchSuggestion';
import Frame from '../../components/frame/Frame';
import Button from '../../components/button/Button';
import Banner from '../../components/banner/Banner';
import './createGame.css';

const CreateGame = () => {

    const {user} = useContext(UserContext);
    const [search, setSearch ] = useState('')
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!search) return;
        setLoading(true)
        try{
            const result = await fetchSuggestions(search);
            setSuggestions(result.data || []);
        }catch (err){
            console.log("Error: ", err.message);
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className='create vanish'>
            <Banner text='New Gamme' />
            <div className="create__frame">
                <Frame src={user.profileImage} text={user.nickname} fontSize={"1.2rem"} />
                <Frame src={"/images/question.png"} text={""} fontSize={"1.2rem"}/>
            </div>

            <div className="create__container">

                <input className="input"
                    placeholder="Search Song"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                />

                {loading ? (
                    <p>Loading...</p>
                    ) : (
                    suggestions.length > 0 && (
                        <div className='create__suggestions'>
                        {suggestions.map((song, index) => (
                            <p className='song' key={index}>
                            {song.artist.name} - {song.title}
                            </p>
                        ))}
                        </div>
                    )
                )}

                <Button className='primary' text="Search song" disabled={!search} handleFunc={handleSubmit} />

            </div>
        </div>
    );
}

export default CreateGame;