import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function EventDetail() {
	const [event, setEvent] = useState(null);
	const { id } = useParams();

	useEffect(() => {
		api.get(`/events/${id}`)
			.then((response) => setEvent(response.data))
			.catch((error) => console.log(error));
	}, [id]);

	if(!event) return <div>Carregando...</div>

	return (
		<div>
			<h1>{event.title}</h1>
			<p>{event.description}</p>
			{event.sessions?.map((session) => (
				<div key={session.id}>
					<p>{session.scheduledAt}</p>
					{session.sectors?.map((sector) => (
						<div key={sector.id}>
							<p>{sector.nameSector}</p>
							<p>R$ {sector.fullPrice}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default EventDetail;
