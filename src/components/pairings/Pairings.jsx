import Frame from '../frame/Frame';
import './pairings.css'

const Pairings = ({ pairings }) => {  // Usa destructuring para recibir las props correctamente
    // Verificar si pairings existe y tiene elementos
    const hasPairings = Array.isArray(pairings) && pairings.length > 0;
    
    return (
        <div className="pairings">
            <h2>Pairings:</h2>
            <div className="pairings__list">
                {hasPairings ? (
                    pairings.map((pair, index) => (
                        <div key={index} className="pairings__item">
                            <div className="pairing">
                                <div className="pairing__frame">
                                    <Frame src={pair.creatorUser.icon} text={pair.creatorUser.name} fontSize={"1rem"} />
                                </div>
                                <div className="pairing__song">
                                    <span className='song__code' >{pair.pairingCode}</span>
                                    <img className='song__img' src={pair.song.albumImage} alt="" />
                                    <h3 className='song__title' >{pair.song.title}</h3>
                                    <h3 className='song__artist' >{pair.song.artist}</h3>
                                </div>
                                <div className="pairing__frame">
                                    {
                                        pair.pairedUser ? (
                                            <Frame src={pair.pairedUser.icon} text={pair.pairedUser.className} />
                                        ) : (
                                            <Frame />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No pairings available</p>
                )}
            </div>
        </div>
    );
}

export default Pairings;