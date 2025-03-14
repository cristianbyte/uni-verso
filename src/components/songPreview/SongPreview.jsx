import './songPreview.css'

const SongPreview = ({codImg, artist, title, verseCount = 10, lyrics, isSample}) => {
    
    return (
        <div className='songPrev' >
            <div className="songPreview">
                { codImg &&
                    <img className='songPrev__img' src={`http://e-cdns-images.dzcdn.net/images/cover/${codImg}/250x250.jpg`} alt={title} />
                }
                <div className="songPrev__info">
                    <h4 className='songPrev__text' >{title}</h4>
                    <h4 className='songPrev__text' >{artist}</h4>
                    <h4 className='songPrev__text' >{verseCount} verses</h4>
                </div>
            </div>
            <pre className="songPrev__lyrics">
                {lyrics}
            </pre>
        </div>
    );
}

export default SongPreview;