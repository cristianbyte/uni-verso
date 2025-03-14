const IframeDeezer = ({trackId}) => {
    return (
        <iframe 
            title="deezer-widget" 
            src={`https://widget.deezer.com/widget/light/track/${trackId}`}
            width="100%" 
            height="150px" 
            frameborder="0" 
            allowtransparency="true" 
            allow="encrypted-media; clipboard-write">
        </iframe>
    );
}

export default IframeDeezer;