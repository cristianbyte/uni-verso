import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import './pairingStats.css';
const PairingStats = () => {

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div className={`stats ${isOpen ? 'open' : ''}`} id='stats' >
            <div className={`stats__arrow ${isOpen ? 'down' : ''}`} onClick={handleOpen} >
                <ChevronDown className={`icon ${isOpen ? 'rotate-180' : ''}`} />
            </div>
            <div className='stats__info'>
                <p>Total songs: 10</p>
                <p>Average time: 30 minutes</p>
                <p>Longest song: 45 minutes</p>
                <p>Shortest song: 15 minutes</p>
            </div>
        </div>
    )
}

export default PairingStats;