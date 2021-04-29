import React from 'react';
import './LoginForm.css';

export default function LoginForm(props)
{
	
	
	return (
		<div className="LoginForm">
			
			<h1>Contributer Login</h1>
			<form>
				<div className="inputArea">
					<label htmlFor="username">Email Address:</label>
					<input type="email" id="emailAddressInput" name="username" />
				</div>
				<div className="inputArea">
					<label htmlFor="password">Password:</label>
					<input type="password" id="passwordInput" name="password" />
				</div>
				
				<input type="submit" value="Log In" />
			</form>
			
		</div>
	);
}