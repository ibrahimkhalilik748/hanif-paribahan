import React from 'react';
import { Link } from 'react-router-dom';
import './Options.css'

const Options = (props) => {
    const { name, image, id } = props.options;
    return (
        <Link to={"/destination/"+id} className="box">
                <div className="img">
                    <img src={image} alt="" />
                </div>
                <h3>{name}</h3>
                <p>{id}</p>
        </Link>
    );
};

export default Options;