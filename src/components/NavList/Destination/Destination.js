import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './Destination.css'


const Destination = (props) => {
    return (
        <div className="container App">
            <div className="row">
                <div className="col-md-4">
                    <form action="">
                        <h6>Pick from</h6>
                        <input type="text" defaultValue="Mirpur 1" />
                        <h6>Pick from</h6>
                        <input type="text" defaultValue="Dhanmondi 32" /><br />
                        <input style={{ width: '250px' }} className="button" type="submit" value="Search" />
                    </form>
                    <br /><br />
                </div>
                <div className="col-md-8">
                    <div className="img2">
                        <img src="../../image/Map.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;