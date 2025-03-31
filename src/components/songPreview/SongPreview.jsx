import './songPreview.css'

const SongPreview = ({codImg, artist, title, verseCount = 10, lyrics, isSample}) => {

    const formattedLyrics = Array.isArray(lyrics) ? lyrics.join('\n') : '';

    return (
        <div className='songPrev' >
            <div className="songPreview">
                { codImg &&
                    <img className='songPrev__img' src={`http://e-cdns-images.dzcdn.net/images/cover/${codImg}/500x500.jpg`} alt={title} />
                }
                <div className="songPrev__info">
                    <h4 className='songPrev__text' >{title}</h4>
                    <h4 className='songPrev__text' >{artist}</h4>
                    <h4 className='songPrev__text' >{verseCount} verses</h4>
                </div>
            </div>
            <pre className="songPrev__lyrics">
                {formattedLyrics}
            </pre>
        </div>
    );
}

export default SongPreview;