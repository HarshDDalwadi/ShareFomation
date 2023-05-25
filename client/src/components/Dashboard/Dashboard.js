import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./Dashboard.css";
import { WhatsappIcon } from "react-share";
import { WhatsappShareButton } from "react-share";


const Dashboard = () => {

	let number = 1;

	const [data, setData] = useState();
	const [day, setDay] = useState();
	const [month, setMonth] = useState();
	const [msg, setMsg] = useState("");
	const [email, setEmail] = useState("");
	const [email2, setEmail2] = useState("");
	const [string, setString] = useState("");
	const [date, setDate] = useState("");
	const [single, setSingle] = useState();
	const [b1, setB1] = useState("Send Complete Info Email");
	const [b2, setB2] = useState("Send Single Data Info Email");



	const handleData = async () => {
		try {
			let string_new;
			const response = await axios.get("http://localhost:3001/api/dashboard");
			setData(response.data);
			const new_date = new Date();
			setDay(new_date.getDate());
			setMonth(new_date.getMonth());
			for (let i = 0; i < data?.length; i++) {
				string_new += `Name : ${data[i].symbol}\nDay High : ${data[i].dayHigh}\nDay Low : ${data[i].dayLow}\nOpen : ${data[i].open}\n\n`
			}
			setMsg(`The share prices on ${day} ${monthNames[month]} 2023 are as follows : \n` + string_new);
			setString(`The share prices on ${day} ${monthNames[month]} 2023 are as follows : \n` + string_new);
		} catch (error) {
			console.error(error);
		}
	}

	const getData = async () => {
		const response = await axios.post("http://localhost:3001/api/share-day", {
			date
		});
		console.log(response.data.Results[0]);
		setSingle(response.data.Results[0]);
	}

	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	useEffect(() => {
		handleData();
	});

	const handleClick = (e) => {
		setB1("Sending...");
		const subject = "Stock Prices Update";
		e.preventDefault();
		axios
			.post("http://localhost:3001/api/send-email", {
				email,
				subject,
				string,
			})
			.then((response) => {
				console.log('Email sent successfully');
				setEmail("");
			})
			.catch((error) => {
				console.error('Error sending email', error);
			});
		setB1("Send Complete Info Email");
	};

	const sendSingle = (e) => {
		e.preventDefault();
		setB2("Sending...");
		const subject = "Stock Prices Update";
		const string = `The stock prices on ${date} are as follows : \nOpen: ${single.Open}\nClose: ${single.Close}\nHigh: ${single.High}\nLow:${single.Low}\nVolume:${single.Volume}`
		axios
			.post("http://localhost:3001/api/send-email", {
				email: email2,
				subject,
				string,
			})
			.then((response) => {
				console.log('Email sent successfully');
				setEmail2("");
			})
			.catch((error) => {
				console.error('Error sending email', error);
			});
		setB2("Send Single Data Info Email");
	}

	return (
		<div className="dashboard">
			<div className="date" style={{ margin: "10px" }}>
				<h3>
					Today's Date : {day}  {monthNames[month]}, 2023
				</h3>
			</div>
			<div className="share">
				<div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>

					<h2 style={{ marginTop: "10px", marginRight: "5px" }}>Share Via Whatsapp : </h2>
					<WhatsappShareButton url={msg}>
						<WhatsappIcon round={true} />
					</WhatsappShareButton>
				</div>
				<p>
					<input value={email} type="email" onChange={(e) => setEmail(e.target.value)} className="input" placeholder='Enter the email where you wish to share the information' />
					<button onClick={handleClick} className="button">{b1}</button>

				</p>
			</div>
			<h2>Enter Date : </h2>
			<input value={date} type="text" onChange={(e) => setDate(e.target.value)} className="input" placeholder='Enter the date in "yyyy-mm-dd" format' />
			<button className="button" onClick={getData}>Get Info</button>
			<br />
			<input value={email2} type="email" onChange={(e) => setEmail2(e.target.value)} className="input" placeholder='Enter the email where you wish to share the information' />
			<button className="button" onClick={sendSingle}>{b2}</button>
			{single && <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
				<h2>Stock Market on {date} are : </h2>
				<div style={{ backgroundColor: "darkgray", borderRadius: "20px", padding: "10px", width: "60%", textAlign: "center", border: "2px solid black" }}>
					<h3>
						Open : {single.Open}
					</h3>
					<h3>
						Close : {single.Close}
					</h3>
					<h3>
						High : {single.High}
					</h3>
					<h3>
						Low : {single.Low}
					</h3>
					<h3>
						Volume : {single.Volume}
					</h3>
				</div>

			</div>}
			<h2 style={{ margin: "10px" }}>Today's Prices</h2>
			<table>
				<tbody>
				<tr>
					<th>Sr.No</th>
					<th>Name</th>
					<th>Day High</th>
					<th>Day Low</th>
					<th>Open</th>
				</tr>

					{
						data?.map((e) => {
							return (
								<tr key={e.symbol}>
									<td>{number++}</td>
									<td>{e.symbol}</td>
									<td>{e.dayHigh}</td>
									<td>{e.dayLow}</td>
									<td>{e.open}</td>
								</tr>
							)
						})
					}
				</tbody>

			</table>
		</div>
	)
}

export default Dashboard;
