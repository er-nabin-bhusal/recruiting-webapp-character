import { useSelector, useDispatch } from 'react-redux';
import {
    decreaseSkill,
    increaseSkill,
    getModifier,
    getAvailableSkillPoints
} from '../slices/characterSlice';

import { SKILL_LIST } from '../consts';

const Skill = ({ skill }) => {
    const dispatch = useDispatch();
    const modifier = useSelector(state => getModifier(state.character.attributes, skill['attributeModifier']));
    const skillPoints = useSelector(state => state.character.skills[skill['name']]);

    const totalSkillPoints = modifier + skillPoints;

    return (
        <div className='Attr'>
            <span>{skill['name']}: {skillPoints} </span>
            <span>(Modifier: {skill['attributeModifier']}): {modifier}</span>

            <button onClick={() => dispatch(decreaseSkill(skill['name']))}> - </button>
            <button onClick={() => dispatch(increaseSkill(skill['name']))}> + </button>

            <span> total: {totalSkillPoints}</span>
        </div>
    )
}

const SkillControl = () => {

    const totalAvailableSkillPoints = useSelector(state => getAvailableSkillPoints(state.character.attributes));
    return (
        <div className="Attr-control-container">
            <h2>Total Skill points available: {totalAvailableSkillPoints}</h2>
            {
                Object.keys(SKILL_LIST).map(key => {
                    return (
                        <Skill key={`SKILL - ${key}`} skill={SKILL_LIST[key]} />
                    )
                })
            }
        </div>
    );
};

export default SkillControl;
