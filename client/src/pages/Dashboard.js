import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, Calendar, Tag, Settings } from "lucide-react";
import api from "../services/api";

function Dashboard() {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		api.get("/events/my")
			.then((response) => {
				setEvents(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);

	const handleDelete = async (id) => {
		if (!window.confirm("Tem certeza que deseja deletar este evento?")) return;
		try {
			await api.delete(`/events/${id}`);
			setEvents((prev) => prev.filter((event) => event.id !== id));
		} catch (error) {
			alert("Erro ao deletar evento");
		}
	};

	if (loading)
		return (
			<div className='flex items-center justify-center min-h-[60vh]'>
				<div className='w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin' />
			</div>
		);

	return (
		<div className='max-w-5xl mx-auto'>
			{/* Header */}
			<div className='flex items-center justify-between mb-8'>
				<div>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Meus Eventos</h1>
					<p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>
						{events.length} evento{events.length !== 1 ? "s" : ""} criado{events.length !== 1 ? "s" : ""}
					</p>
				</div>
				<Link
					to='/events/create'
					className='flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-colors'
				>
					<Plus size={18} />
					Novo evento
				</Link>
			</div>

			{/* Lista vazia */}
			{events.length === 0 ? (
				<div className='text-center py-16 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl'>
					<p className='text-4xl mb-4'>🎟️</p>
					<p className='text-gray-500 dark:text-gray-400 mb-4'>Você ainda não criou nenhum evento</p>
					<Link
						to='/events/create'
						className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm transition-colors'
					>
						<Plus size={16} />
						Criar primeiro evento
					</Link>
				</div>
			) : (
				<div className='space-y-4'>
					{events.map((event) => (
						<div
							key={event.id}
							className='flex gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary-200 dark:hover:border-primary-900 transition-all'
						>
							{/* Banner */}
							<div className='w-24 h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0'>
								{event.banner ? (
									<img src={event.banner} alt={event.title} className='w-full h-full object-cover' />
								) : (
									<div className='w-full h-full flex items-center justify-center text-2xl'>🎟️</div>
								)}
							</div>

							{/* Info */}
							<div className='flex-1 min-w-0'>
								<h2 className='font-semibold text-gray-900 dark:text-white truncate'>{event.title}</h2>
								<p className='text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1'>
									{event.description}
								</p>
								<div className='flex items-center gap-3 mt-2'>
									<span className='flex items-center gap-1 text-xs text-gray-400'>
										<Tag size={12} />
										{event.category}
									</span>
									<span className='flex items-center gap-1 text-xs text-gray-400'>
										<Calendar size={12} />
										{event.sessions?.length || 0} sessões
									</span>
								</div>
							</div>

							{/* Ações */}
							<div className='flex items-center gap-2 flex-shrink-0'>
								<Link
									to={`/events/${event.id}/manage`}
									className='p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all'
								>
									<Settings size={16} />
								</Link>
								<Link
									to={`/events/${event.id}/edit`}
									className='p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-all'
								>
									<Pencil size={16} />
								</Link>
								<button
									onClick={() => handleDelete(event.id)}
									className='p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-red-500 hover:text-red-500 transition-all'
								>
									<Trash2 size={16} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

export default Dashboard;
