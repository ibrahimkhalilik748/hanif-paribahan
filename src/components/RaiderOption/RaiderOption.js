import React from 'react';
import { useState } from 'react';
import Data from '../Data/DATA.json';
import Options from './Options';
import './RaiderOption.css'

const RaiderOption = () => {
    const data = Data
    const [options, setOptions] = useState(data)
    return (
        <div className="display">
            {
                options.map(option => <Options options={option}></Options>)
            }
        </div>
    );
};

export default RaiderOption;