import './frame.css';

const Frame = ({ src, text, fontSize}) => {

    const formatName = (fullName) => {
        const nameParts = fullName.trim().split(' ');
        
        if (nameParts.length === 1) {
            return nameParts[0];
        }
        
        const firstName = nameParts[0];
        const lastInitial = nameParts[1][0]; 
        
        return `${firstName} ${lastInitial}.`;
    };

    return (
        <div className='frame'>
            <img 
                src={src}
                alt="frame"
                className="frame__image" 
            />
            {text && (
                <h3 className="frame__text" style={{ fontSize }}>
                    {formatName(text)}
                </h3>
            )}
        </div>
    );
}

export default Frame;