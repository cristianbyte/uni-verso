import { DEEZER_WIDGET_BASE_URL } from '../../config/app-config';

const IframeDeezer = ({trackId}) => {
    return (
        <iframe 
            title="deezer-widget" 
            src={`${DEEZER_WIDGET_BASE_URL}/${trackId}`}
            width="100%" 
            height="150px" 
            allowtransparency="true" 
            allow="encrypted-media; clipboard-write">
        </iframe>
    );
}

export default IframeDeezer;
