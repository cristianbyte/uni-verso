import './frame.css';

const Frame = ({ src, text }) => {

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
            <h3 className='frame__text'>
                {formatName(text)}
            </h3>
        </div>
    );
}

export default Frame;