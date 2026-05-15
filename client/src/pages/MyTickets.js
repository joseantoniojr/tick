import { useState, useEffect } from "react";
import api from "../services/api";

function MyTickets() {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		api.get("/tickets/my")
			.then((response) => setTickets(response.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div>
			<h1>Meus Ingressos</h1>
			<div>
				{tickets.map((ticket) => (
					<div key={ticket.id}>
						<h2>{ticket.event.title}</h2>

						<img src={ticket.event.banner} alt={ticket.event.title} width={200} />

						<p>Categoria: {ticket.event.category}</p>

						<p>Setor: {ticket.sector.nameSector}</p>

						<p>Tipo: {ticket.type}</p>

						<p>
							Data:
							{new Date(ticket.session.scheduledAt).toLocaleString("pt-BR")}
						</p>

						<p>Valor: R$ {ticket.pricePaid}</p>

						<p>
							Status:
							{ticket.status ? "Usado" : "Ativo"}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default MyTickets;
