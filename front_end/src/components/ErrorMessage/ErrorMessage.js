import React from 'react';

//Props:
//error - The error message
//isException - Boolean. Is this an exception? Used to set the color scheme of the component
//  (red if an exception, orange if a lesser error)
function ErrorMessage(props)
{
    const style = {
        color: (props.isException) ? "#640000" : "#5B2200",
        fontWeight: "bold", 
        textAlign: "center",
        borderWidth: "2px",
        borderStyle: "solid",
        borderColor: (props.isException) ? "#A10000" : "#A13B00",
        borderRadius: "1em",
        padding: "0.5em",
        margin: "0.5em",
        backgroundColor: (props.isException) ? "#FF0000" : "#FF5D00" //Red if exception, orange if not
    };
    
    return (
        <div className="ErrorMessage" style={style}>
            {props.error}
        </div>
    );
}

export default ErrorMessage;