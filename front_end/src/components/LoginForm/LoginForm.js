import React, { useState } from 'react';
import './LoginForm.css';
import getAPISettings from '../../dataRetrieval/seperateDataRetrievers/getAPISettings';

export default function LoginForm(props)
{
	let [apiSettings, setApiSettings] = props.apiSettingsState;
	
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);
	
	const loginHandler = async (e) => {
		
		e.preventDefault();
		
		//This function does the check to see if we already have them loaded
		
		try
		{
			const currentApiSettings = await getAPISettings(apiSettings);
			setApiSettings(currentApiSettings);
			
			if(!currentApiSettings.hasOwnProperty("local_api_base_address"))
			{
				setLoginErrorMessage("Sorry, but the contributers system is not currently available.");
				return;
			}
			
			
		}
		catch(err)
		{
			setLoginErrorMessage("Sorry, but their was an error while connecting to the contributers system. Please try again later.");
		}
		
	}
	
	return (
		<div className="LoginForm">
			
			<h1>Contributer Login</h1>
			{loginErrorMessage && <p className="loginError">{loginErrorMessage}</p>}
			<form onSubmit={loginHandler}>
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