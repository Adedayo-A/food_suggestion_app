//import Dropdown from './dropdown.png';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import '../static/reusable-components/custom-multiselect.scss';
import iOption from '../interfaces/iOption';
import React, { FC } from 'react';

interface OptionProps {
    options: iOption[];
    selected: string[];
    toggleOption: ({id}) => void
}

const CustomMultiSelectDropdown: FC<OptionProps> = ({options, selected, toggleOption}) => {

    return (
        <div className="c-multi-select-dropdown">
            <div className="c-multi-select-dropdown__selected">
                <div> {selected.length} selected </div>
                <ArrowDropDown />
            </div>

            <ul className="c-multi-select-dropdown__options">
                {options.map((option, i) => {
                    const isSelected = selected.includes(option.id);

                    return (
                        <li className="c-multi-select-dropdown__option" key={i} onClick={() => toggleOption({ id: option.id })}>
                            <input type="checkbox" checked={isSelected} className="c-multi-select-dropdown__option-checkbox"></input>
                            <span>{option.name}</span>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

export default CustomMultiSelectDropdown