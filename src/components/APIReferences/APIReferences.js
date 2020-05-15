import React from 'react';
import './APIReferences.css';

//The references/copyrights for the used APIs
function APIReferences()
{
    return(
        <div className="APIReferences">
            <div className="APIReference">
                <a href="https://www.meteostat.net" title="meteostat" target="_blank">Meteostat</a>. Meteorological 
                    data: Copyright &copy; National Oceanic and Atmospheric Administration (NOAA), Deutscher 
                    Wetterdienst (DWD). Learn more about the <a href="https://www.meteostat.net/sources" 
                    title="meteostat Sources" target="_blank">sources</a>.
            </div>
            
            <div className="APIReference">
                F1 data provided by the <a href="https://ergast.com/mrd/" title="ergast" target="_blank">Ergast Developer API</a>.
            </div>
        </div>
    );
}

export default APIReferences;