import { createSlice } from '@reduxjs/toolkit';
import { SKILL_LIST, ATTRIBUTE_LIST } from '../consts';

const skillInitialState = SKILL_LIST.reduce((acc, skill) => {
    acc[skill['name']] = 0;
    return acc;
}, {});

const attributeInitialState = ATTRIBUTE_LIST.reduce((acc, attribute) => {
    acc[attribute] = 10;
    return acc;
}, {});

const initialState = {
    skills: skillInitialState,
    attributes: attributeInitialState
}

const slicer = createSlice({
    name: 'character',
    initialState,

    reducers: {
        increaseAttribute: (state, action) => {
            state.attributes[action.payload] += 1;
        },
        decreaseAttribute: (state, action) => {
            state.attributes[action.payload] -= 1;
        },
        increaseSkill: (state, action) => {
            if (!validateSkillPointIncrement(state)) {
                alert('Cannot increase skill points beyond available points');
                return;
            }    
            state.skills[action.payload] += 1;
        },
        decreaseSkill: (state, action) => {
            if (state.skills[action.payload] === 0) {
                alert('Cannot decrease below 0');
                return;
            }
            state.skills[action.payload] -= 1;
        }
    }
});

export const getModifier = (state, attribute) => {
    return Math.floor((state[attribute] - 10) / 2);
}

export const getAvailableSkillPoints = (state) => {
    return 10 + 4 * getModifier(state, 'Intelligence');
}

export const validateSkillPointIncrement = (state) => {
    const totalAvailableSkillPoints = getAvailableSkillPoints(state.attributes);
    const totalSkillPoints = Object.values(state.skills).reduce((acc, skillPoint) => acc + skillPoint, 0);
    return totalSkillPoints < totalAvailableSkillPoints;
}


export const { increaseAttribute, decreaseAttribute, increaseSkill, decreaseSkill } = slicer.actions;
export default slicer.reducer;
