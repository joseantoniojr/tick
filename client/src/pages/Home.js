import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Calendar, MapPin } from "lucide-react";

function Home() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api.get("/events")
			.then((response) => {
				setEvents(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	if (loading)
		return (
			<div className='flex items-center justify-center min-h-[60vh]'>
				<div className='w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin' />
			</div>
		);

	return (
		<div>
			{/* Hero */}
			<div className='text-center py-16 md:py-24'>
				<h1 className='text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4'>
					Encontre seu próximo
					<span className='text-primary-600 dark:text-primary-400'> evento</span>
				</h1>
				<p className='text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto'>
					Descubra shows, festivais, peças e muito mais perto de você.
				</p>
			</div>

			{/* Grid de eventos */}
			{events.length === 0 ? (
				<div className='text-center py-16'>
					<p className='text-gray-500 dark:text-gray-400'>Nenhum evento disponível no momento.</p>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
					{events.map((event) => (
						<Link
							key={event.id}
							to={`/events/${event.id}`}
							className='group relative rounded-2xl overflow-hidden aspect-[3/4] bg-gray-100 dark:bg-gray-800 hover:scale-[1.02] transition-all duration-300'
						>
							{/* Imagem de fundo */}
							{event.banner ? (
								<img
									src={event.banner}
									alt={event.title}
									className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
								/>
							) : (
								<div className='absolute inset-0 flex items-center justify-center text-5xl'>🎟️</div>
							)}

							{/* Gradiente */}
							<div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent' />

							{/* Badge categoria */}
							<div className='absolute top-3 left-3'>
								<span className='text-xs font-semibold px-3 py-1 rounded-full bg-primary-600/90 backdrop-blur-sm text-white'>
									{event.category}
								</span>
							</div>

							{/* Conteúdo inferior */}
							<div className='absolute bottom-0 left-0 right-0 p-4'>
								{/* Data */}
								{event.sessions?.[0] && (
									<div className='flex items-center gap-1.5 mb-2'>
										<Calendar size={13} className='text-primary-400' />
										<span className='text-xs font-medium text-primary-400'>
											{new Date(event.sessions[0].scheduledAt).toLocaleDateString("pt-BR", {
												day: "2-digit",
												month: "long",
											})}
										</span>
									</div>
								)}

								{/* Título */}
								<h2 className='text-white font-bold text-base leading-tight mb-1 group-hover:text-primary-300 transition-colors line-clamp-2'>
									{event.title}
								</h2>

								{/* Localização */}
								<div className='flex items-center gap-1 mt-1'>
									<MapPin size={12} className='text-gray-400 flex-shrink-0' />
									<span className='text-xs text-gray-300 truncate'>
										{event.city} - {event.state} — {event.venueName}
									</span>
								</div>

								{/* Classificação */}
								<div className='flex items-center justify-between mt-3 pt-3 border-t border-white/10'>
									<span className='text-xs text-gray-400'>
										{event.sessions?.length || 0} {event.sessions?.length <= 1 ? "sessão" : "sessões"}
									</span>
									<span className='text-xs font-medium px-2 py-0.5 rounded-full bg-white/10 text-gray-300'>
										{event.indicativeRating === "Livre" ? "Livre" : `${event.indicativeRating}+`}
									</span>
								</div>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export default Home;
