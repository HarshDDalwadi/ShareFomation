/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";

import Dashboard from './components/Dashboard/Dashboard';
import "./App.css"
import Header from './components/Header/Header';


const App = () => {

	const [user, setUser] = useState({});


	const handleCallbackResponse = (response) => {
		var userObject = jwt_decode(response.credential);
		setUser(userObject);
	}

	const handleSignOut = (e) => {
		setUser({});
	}

	const authAndFetch = async () => {
		google.accounts.id.initialize({
			client_id: "949322953541-e0prhjtmet8p5t2066bqhpnu40g9cvh4.apps.googleusercontent.com",
			callback: handleCallbackResponse
		});

		google.accounts.id.renderButton(
			document.getElementById('signInDiv'),
			{ theme: 'outline', size: "large" }
		);
	}

	useEffect(() => {
		authAndFetch();
	})

	return (
		<div className="app">
			<div id="sidnInBigDiv" style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
				{(!user.name || user.name === "") &&
					<div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", height:"100vh"}}>
						<h1>
							Basic React Application
						</h1>
						<h3>
							This application lets the user fetch the prices of stocks every day and share the information through whatsapp or mail
						</h3>
						<div id="signInDiv" style={{ display: "flex", justifyContent: "center", alignItems: "center" , marginTop:"10px"}}>
						</div>
					</div>
				}
			</div>

			{
				user.name &&
				<div className="main">
					<Header name={user.name} img={user.picture} />
					<button className="button" onClick={(e) => handleSignOut(e)}>Sign Out</button>
					<Dashboard />
				</div>
			}

		</div >
	)
}

export default App
