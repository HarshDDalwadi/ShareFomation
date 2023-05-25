import React from 'react'

const Header = (props) => {
	return (
		<div className="header">
			<div className="upper">
				<h1>
					Basic React Application
				</h1>
				<h3>
					This application lets the user fetch the prices of stocks every day and share the information through whatsapp or mail
				</h3>
			</div>
			<div className="image" style={{margin:"10px"}}>
				<img src={props.img} alt="User" id="image" className="imagePic" style={{borderRadius:"50%", border:"2px solid black"}}/>
			</div>
			<div>
				<h3 style={{marginBottom:"10px"}}>Name : {props.name}</h3>
			</div>
		</div>
	)
}

export default Header
