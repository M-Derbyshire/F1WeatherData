import React from 'react';
import './RouteNotFoundMessage.css';

function RouteNotFoundMessage()
{
	return (
		<div className="RouteNotFoundMessage">
			<h1>URL not found</h1>
			<p>The requested URL is not valid.</p>
		</div>
	);
}
export default RouteNotFoundMessage;