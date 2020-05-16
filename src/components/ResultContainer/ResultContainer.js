import React from 'react';
import './ResultContainer.css';

function ResultContainer(props)
{
    return (
        <div className="ResultContainer">
            {React.Children.map(props.children, (child) => child)}
        </div>
    );
}

export default ResultContainer;