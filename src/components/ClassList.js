import { useSelector } from 'react-redux';
import { useState } from 'react';
import { CLASS_LIST } from '../consts.js';

const Class = ({ className, closeView }) => {
    if (!className) return null;

    const attributes = CLASS_LIST[className];

    return (
        <div className="Classlist-class-container">
            <h3>{className}</h3>
            <ul>
                {Object.keys(attributes).map(attr => (
                    <li key={`class-${attr}`}>
                        {attr}: {attributes[attr]}
                    </li>
                ))}
            </ul>
            <button onClick={()=>closeView(null)}>Close View</button>
        </div>
    );
}


const ClassList = () => {

    const [selectedClass, setSelectedClass] = useState(null);
    const attributes = useSelector(state => state.character.attributes);

    const meetsRequirements = (className) => {
        const requirements = CLASS_LIST[className];
        return Object.keys(requirements).every(attr => attributes[attr] >= requirements[attr]);
    }

    return (
        <div className='Classlist-container'>
            {Object.keys(CLASS_LIST).map((className) => (
                <div
                    className='Classlist-item'
                    onClick={() => setSelectedClass(selectedClass === className ? null : className)}
                    style={{ color: meetsRequirements(className) ? 'red' : 'white' }}
                    key={className}
                >
                    {className}
                </div>
            ))}
            <Class className={selectedClass} closeView={setSelectedClass} />
        </div>
    );
};

export default ClassList;
