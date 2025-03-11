import './frame.css';

const Frame = ({ src, text }) => {
    return (
        <div className='frame'>
            <img 
                src={src}
                alt="frame"
                className="frame__image" 
            />
            <h3 className='frame__text'>
                {text}
            </h3>
        </div>
    );
}

export default Frame;