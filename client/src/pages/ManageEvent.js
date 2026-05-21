import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Calendar, Users, DollarSign } from "lucide-react";
import api from "../services/api";

function ManageEvent() {
	const { id } = useParams();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);

	const [newSessionDate, setNewSessionDate] = useState("");
	const [creatingSession, setCreatingSession] = useState(false);
    
	const [newSector, setNewSector] = useState({ nameSector: "", fullPrice: "", ticketsAvailable: "" });
	const [selectedSessionId, setSelectedSessionId] = useState(null);
	const [creatingSector, setCreatingSector] = useState(false);

	const fetchEvent = () => {
		api.get(`/events/${id}`)
			.then((response) => {
				setEvent(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	};

	useEffect(() => {
		fetchEvent();
	}, [id]);

	// Criar sessão
	const handleCreateSession = async (e) => {
		e.preventDefault();
		if (!newSessionDate) return alert("Selecione uma data");
		setCreatingSession(true);
		try {
			await api.post(`/events/${id}/sessions`, { scheduledAt: newSessionDate });
			setNewSessionDate("");
			fetchEvent();
		} catch (error) {
			alert("Erro ao criar sessão");
		} finally {
			setCreatingSession(false);
		}
	};

	// Deletar sessão
	const handleDeleteSession = async (sessionId) => {
		if (!window.confirm("Deletar esta sessão e todos os seus setores?")) return;
		try {
			await api.delete(`/events/${id}/sessions/${sessionId}`);
			fetchEvent();
		} catch (error) {
			alert("Erro ao deletar sessão");
		}
	};

	// Criar setor
	const handleCreateSector = async (e, sessionId) => {
		e.preventDefault();
		if (!newSector.nameSector || !newSector.fullPrice || !newSector.ticketsAvailable) {
			return alert("Preencha todos os campos do setor");
		}
		setCreatingSector(true);
		try {
			await api.post(`/events/${id}/sessions/${sessionId}/sectors`, {
				nameSector: newSector.nameSector,
				fullPrice: Number(newSector.fullPrice),
				ticketsAvailable: Number(newSector.ticketsAvailable),
			});
			setNewSector({ nameSector: "", fullPrice: "", ticketsAvailable: "" });
			setSelectedSessionId(null);
			fetchEvent();
		} catch (error) {
			alert("Erro ao criar setor");
		} finally {
			setCreatingSector(false);
		}
	};

	// Deletar setor
	const handleDeleteSector = async (sessionId, sectorId) => {
		if (!window.confirm("Deletar este setor?")) return;
		try {
			await api.delete(`/events/${id}/sessions/${sessionId}/sectors/${sectorId}`);
			fetchEvent();
		} catch (error) {
			alert("Erro ao deletar setor");
		}
	};

	if (loading)
		return (
			<div className='flex items-center justify-center min-h-[60vh]'>
				<div className='w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin' />
			</div>
		);

	if (!event)
		return (
			<div className='text-center py-16'>
				<p className='text-gray-500 dark:text-gray-400'>Evento não encontrado.</p>
			</div>
		);

	// Métricas
	const totalTicketsSold =
		event.sessions?.reduce(
			(acc, session) => acc + session.sectors?.reduce((a, sector) => a + sector.tickets?.length || 0, 0),
			0,
		) || 0;

	const totalRevenue =
		event.sessions?.reduce(
			(acc, session) =>
				acc +
				session.sectors?.reduce(
					(a, sector) => a + sector.tickets?.reduce((t, ticket) => t + Number(ticket.pricePaid), 0) || 0,
					0,
				),
			0,
		) || 0;

	const totalAvailable =
		event.sessions?.reduce(
			(acc, session) => acc + session.sectors?.reduce((a, sector) => a + sector.ticketsAvailable, 0),
			0,
		) || 0;

	return (
		<div className='max-w-4xl mx-auto'>
			{/* Header */}
			<div className='flex items-center gap-4 mb-8'>
				<Link
					to='/dashboard'
					className='p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 transition-all'
				>
					<ArrowLeft size={20} />
				</Link>
				<div>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Gerenciar evento</h1>
					<p className='text-primary-600 dark:text-primary-400 font-medium'>{event.title}</p>
				</div>
			</div>

			{/* Métricas */}
			<div className='grid grid-cols-3 gap-4 mb-8'>
				<div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5'>
					<div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2'>
						<Users size={16} />
						Vendidos
					</div>
					<p className='text-3xl font-bold text-gray-900 dark:text-white'>{totalTicketsSold}</p>
				</div>
				<div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5'>
					<div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2'>
						<Calendar size={16} />
						Disponíveis
					</div>
					<p className='text-3xl font-bold text-gray-900 dark:text-white'>{totalAvailable}</p>
				</div>
				<div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5'>
					<div className='flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2'>
						<DollarSign size={16} />
						Arrecadado
					</div>
					<p className='text-3xl font-bold text-primary-600 dark:text-primary-400'>
						R$ {totalRevenue.toFixed(2)}
					</p>
				</div>
			</div>

			{/* Criar sessão */}
			<div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6'>
				<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Adicionar sessão</h2>
				<form onSubmit={handleCreateSession} className='flex gap-3'>
					<input
						type='datetime-local'
						value={newSessionDate}
						onChange={(e) => setNewSessionDate(e.target.value)}
						className='flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
					/>
					<button
						type='submit'
						disabled={creatingSession}
						className='px-4 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium flex items-center gap-2 transition-colors disabled:opacity-50'
					>
						{creatingSession ? (
							<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
						) : (
							<>
								<Plus size={18} /> Adicionar
							</>
						)}
					</button>
				</form>
			</div>

			{/* Sessões */}
			<div className='space-y-4'>
				{event.sessions?.length === 0 && (
					<div className='text-center py-8 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl'>
						<p className='text-gray-500 dark:text-gray-400'>Nenhuma sessão criada ainda</p>
					</div>
				)}

				{event.sessions?.map((session) => (
					<div
						key={session.id}
						className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden'
					>
						{/* Header da sessão */}
						<div className='flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800'>
							<div className='flex items-center gap-2'>
								<Calendar size={18} className='text-primary-500' />
								<span className='font-semibold text-gray-900 dark:text-white'>
									{new Date(session.scheduledAt).toLocaleString("pt-BR")}
								</span>
							</div>
							<button
								onClick={() => handleDeleteSession(session.id)}
								className='p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all'
							>
								<Trash2 size={16} />
							</button>
						</div>

						{/* Setores */}
						<div className='p-5 space-y-3'>
							<h3 className='text-sm font-medium text-gray-500 dark:text-gray-400'>Setores</h3>

							{session.sectors?.map((sector) => (
								<div
									key={sector.id}
									className='flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800'
								>
									<div>
										<p className='font-medium text-gray-900 dark:text-white'>{sector.nameSector}</p>
										<div className='flex items-center gap-3 mt-1'>
											<span className='text-sm text-primary-600 dark:text-primary-400 font-medium'>
												R$ {Number(sector.fullPrice).toFixed(2)}
											</span>
											<span className='text-xs text-gray-400'>
												{sector.ticketsAvailable} disponíveis
											</span>
											<span className='text-xs text-gray-400'>
												{sector.tickets?.length || 0} vendidos
											</span>
										</div>
									</div>
									<button
										onClick={() => handleDeleteSector(session.id, sector.id)}
										className='p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all'
									>
										<Trash2 size={16} />
									</button>
								</div>
							))}

							{/* Adicionar setor */}
							{selectedSessionId === session.id ? (
								<form
									onSubmit={(e) => handleCreateSector(e, session.id)}
									className='grid grid-cols-3 gap-2 pt-2'
								>
									<input
										type='text'
										placeholder='Nome do setor'
										value={newSector.nameSector}
										onChange={(e) =>
											setNewSector((prev) => ({ ...prev, nameSector: e.target.value }))
										}
										className='px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
									/>
									<input
										type='number'
										placeholder='Preço (R$)'
										value={newSector.fullPrice}
										onChange={(e) =>
											setNewSector((prev) => ({ ...prev, fullPrice: e.target.value }))
										}
										className='px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
									/>
									<input
										type='number'
										placeholder='Quantidade'
										value={newSector.ticketsAvailable}
										onChange={(e) =>
											setNewSector((prev) => ({ ...prev, ticketsAvailable: e.target.value }))
										}
										className='px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500'
									/>
									<div className='col-span-3 flex gap-2'>
										<button
											type='button'
											onClick={() => setSelectedSessionId(null)}
											className='flex-1 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 text-sm hover:border-gray-300 transition-colors'
										>
											Cancelar
										</button>
										<button
											type='submit'
											disabled={creatingSector}
											className='flex-1 py-2 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors disabled:opacity-50'
										>
											{creatingSector ? "Salvando..." : "Salvar setor"}
										</button>
									</div>
								</form>
							) : (
								<button
									onClick={() => setSelectedSessionId(session.id)}
									className='w-full py-2 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 text-gray-400 hover:border-primary-500 hover:text-primary-500 text-sm flex items-center justify-center gap-1 transition-all'
								>
									<Plus size={16} />
									Adicionar setor
								</button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ManageEvent;
