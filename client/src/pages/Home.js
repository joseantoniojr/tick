import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Home() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		api.get("/events")
			.then((response) => setEvents(response.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<h1>Eventos</h1>
			<ul>
				{events.map((event) => (
					<li key={event.id}>
						<Link to={`/events/${event.id}`}>{event.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Home;
