import { useSelector, useDispatch } from 'react-redux';
import { increaseAttribute, decreaseAttribute, getModifier } from '../slices/characterSlice';

const Attribute = ({ attribute, value }) => {
    const dispatch = useDispatch();

    const modifier = useSelector(state => getModifier(state.character.attributes, attribute));
    return (
        <div className='Attr'>
            <span>{attribute}: {value} (Modifier: {modifier})</span>
            <button onClick={() => dispatch(decreaseAttribute(attribute))}> - </button>
            <button onClick={() => dispatch(increaseAttribute(attribute))}> + </button>
        </div>
    )
}

const AttributeControls = () => {
    const attributes = useSelector(state => state.character.attributes);
    return (
        <div className="Attr-control-container">
            {
                Object.keys(attributes).map(key => {
                    return (
                        <Attribute key={key} attribute={key} value={attributes[key]} />
                    )
                })
            }
        </div>
    );
};

export default AttributeControls;
