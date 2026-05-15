import { useState, useEffect } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		api.get("events/my")
			.then((response) => setEvents(response.data))
			.catch((error) => console.log(error));
	}, []);

	const handleDelete = async (id) => {
		try {
			await api.delete(`/events/${id}`);
			setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
		} catch (error) {
			console.log(error);
			alert("Error ao tentar deletar o evento.");
		}
	};

	return (
		<div>
			<h1>Meus Eventos</h1>

			<Link to={"/events/create"}>Criar Evento</Link>

			<ul>
				{events.map((event) => (
					<li key={event.id}>
						<p>{event.title}</p>
						<Link to={`/events/${event.id}/edit`}>Editar</Link>
						<button onClick={() => handleDelete(event.id)}>Deletar</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;
