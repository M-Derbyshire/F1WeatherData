import React from 'react';
import './AboutInfo.css';

function AboutInfo()
{
	return (
		<div className="AboutInfo">
			<h1>About this App</h1>
			<p>
				This application provides weather data for historical F1 races. This data is taken from the 
				nearest weather stations to the track that were available at that time.
			</p>
			
			<p>
				The weather data is taken from the <a href="https://www.meteostat.net" title="meteostat" target="_blank" rel="noreferrer noopener">Meteostat API</a>, 
				and the F1 race and location data is taken from the <a href="https://ergast.com/mrd/" title="ergast" target="_blank" rel="noopener noreferrer">Ergast Developer API</a>.
			</p>
		</div>
	);
}
export default AboutInfo;