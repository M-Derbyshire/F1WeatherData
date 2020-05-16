import React from 'react';
import './ResultContainer.css';

function ResultContainer(props)
{
    const children = (props.hasOwnProperty("children")) ? props.children.map((child) => child) : "";
    
    return (
        <div className="ResultContainer">
            {children}
        </div>
    );
}

export default ResultContainer;