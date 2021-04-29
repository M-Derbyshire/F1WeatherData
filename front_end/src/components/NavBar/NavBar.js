import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';


function NavBar(props)
{
	return (
		<nav className="NavBar">
			<ul>
				<li><Link to="/">Search for Weather Data</Link></li>
				<li><Link to="/about">About this App</Link></li>
				<li><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
}
export default NavBar;