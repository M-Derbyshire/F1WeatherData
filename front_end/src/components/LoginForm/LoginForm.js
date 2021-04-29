import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';
import getAPISettings from '../../dataRetrieval/seperateDataRetrievers/getAPISettings';
import getAuthJWT from '../../authentication/getAuthJWT';

//Takes 2 props: apiSettingsState and setAuthHeader
export default function LoginForm(props)
{
	const [apiSettings, setApiSettings] = props.apiSettingsState;
	const setAuthHeader = props.setAuthHeader;
	const [loginErrorMessage, setLoginErrorMessage] = useState(false);
	let history = useHistory();
	
	const loginHandler = async (e) => {
		
		e.preventDefault();
		
		const username = document.getElementById("emailAddressInput").value;
		const passwordInput = document.getElementById("passwordInput");
		const password = passwordInput.value;
		
		try
		{
			//This function does the check to see if we already have them loaded
			const currentApiSettings = await getAPISettings(apiSettings);
			setApiSettings(currentApiSettings);
			
			if(!currentApiSettings.hasOwnProperty("local_api_base_address"))
			{
				setLoginErrorMessage("Sorry, but the contributers system is not currently available.");
				return;
			}
			
			try
			{
				setAuthHeader("Bearer " + await getAuthJWT(username, password, currentApiSettings.local_api_base_address));
				setLoginErrorMessage(false);
				
				//Redirect to home
				history.push("/");
			}
			catch(err)
			{
				//This may say that the login details were incorrect, or it may say it was a connection issue.
				setLoginErrorMessage(err.message);
			}
			
		}
		catch(err)
		{
			setLoginErrorMessage("Sorry, but their was an error while connecting to the contributers system. Please try again later.");
		}
		
		passwordInput.value = "";
		
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