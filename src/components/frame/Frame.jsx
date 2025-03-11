import './frame.css';

const Frame = ({ src }) => {
    return (
        <img 
            src={src}
            alt="frame"
            className="frame"
            style={{ listStyle: "none", borderRadius: "10%"}} 
        />
    );
}

export default Frame;