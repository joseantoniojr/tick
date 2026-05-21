import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { Calendar, Tag, ArrowRight } from "lucide-react";

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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{events.map((event) => (
						<Link
							key={event.id}
							to={`/events/${event.id}`}
							className='group rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10'
						>
							{/* Banner */}
							<div className='aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800'>
								{event.banner ? (
									<img
										src={event.banner}
										alt={event.title}
										className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
									/>
								) : (
									<div className='w-full h-full flex items-center justify-center'>
										<span className='text-4xl'>🎟️</span>
									</div>
								)}
							</div>

							{/* Conteúdo */}
							<div className='p-5'>
								<div className='flex items-center gap-2 mb-3'>
									<span className='text-xs font-medium px-2 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'>
										{event.category}
									</span>
									<span className='text-xs text-gray-400'>{event.indicativeRating}+</span>
								</div>

								<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors'>
									{event.title}
								</h2>

								<p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4'>
									{event.description}
								</p>

								<div className='flex items-center justify-between'>
									<div className='flex items-center gap-1 text-xs text-gray-400'>
										<Calendar size={14} />
										<span>{event.sessions?.length || 0} {event.sessions.length === 1 ? "sessão" : "sessões"}</span>
									</div>
									<span className='text-primary-600 dark:text-primary-400 flex items-center gap-1 text-sm font-medium'>
										Ver mais <ArrowRight size={14} />
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
