import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Tag, Shield, ShoppingCart, ChevronDown } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

function EventDetail() {
	const { id } = useParams();
	const { token } = useContext(AuthContext);
	const navigate = useNavigate();
	const [event, setEvent] = useState(null);
	const [selectedSector, setSelectedSector] = useState(null);
	const [selectedSession, setSelectedSession] = useState(null);
	const [ticketType, setTicketType] = useState("full");
	const [qty, setQty] = useState(1);
	const [loading, setLoading] = useState(true);
	const [buying, setBuying] = useState(false);

	useEffect(() => {
		api.get(`/events/${id}`)
			.then((response) => {
				setEvent(response.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, [id]);

	const handleBuy = async () => {
		if (!token) return navigate("/login");
		if (!selectedSector || !selectedSession) return alert("Selecione uma sessão e setor");

		setBuying(true);
		try {
			await api.post("/tickets/buy", {
				sectorId: selectedSector.id,
				type: ticketType,
				qtyTickets: qty,
			});
			alert("Ingresso comprado com sucesso!");
			navigate("/tickets");
		} catch (error) {
			alert("Erro ao comprar ingresso");
		} finally {
			setBuying(false);
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

	const price = selectedSector
		? ticketType === "full"
			? Number(selectedSector.fullPrice)
			: Number(selectedSector.fullPrice) / 2
		: null;

	return (
		<div className='max-w-5xl mx-auto'>
			{/* Banner */}
			<div className='aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8'>
				{event.banner ? (
					<img src={event.banner} alt={event.title} className='w-full h-full object-cover' />
				) : (
					<div className='w-full h-full flex items-center justify-center'>
						<span className='text-6xl'>🎟️</span>
					</div>
				)}
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
				{/* Info do evento */}
				<div className='lg:col-span-2 space-y-6'>
					{/* Tags */}
					<div className='flex items-center gap-2'>
						<span className='flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'>
							<Tag size={12} />
							{event.category}
						</span>
						<span className='flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'>
							<Shield size={12} />
							{event.indicativeRating}+
						</span>
					</div>

					{/* Título */}
					<h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white'>{event.title}</h1>

					{/* Descrição */}
					<p className='text-gray-600 dark:text-gray-400 leading-relaxed'>{event.description}</p>

					{/* Sessões */}
					<div>
						<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
							Sessões disponíveis
						</h2>
						<div className='space-y-3'>
							{event.sessions?.map((session) => (
								<button
									key={session.id}
									onClick={() => {
										setSelectedSession(session);
										setSelectedSector(null);
									}}
									className={`w-full text-left p-4 rounded-xl border transition-all ${
										selectedSession?.id === session.id
											? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
											: "border-gray-200 dark:border-gray-800 hover:border-primary-300"
									}`}
								>
									<div className='flex items-center gap-2'>
										<Calendar size={16} className='text-primary-500' />
										<span className='text-gray-900 dark:text-white font-medium'>
											{new Date(session.scheduledAt).toLocaleString("pt-BR")}
										</span>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Setores */}
					{selectedSession && (
						<div>
							<h2 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>Setores</h2>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
								{selectedSession.sectors?.map((sector) => (
									<button
										key={sector.id}
										onClick={() => setSelectedSector(sector)}
										disabled={sector.ticketsAvailable === 0}
										className={`text-left p-4 rounded-xl border transition-all ${
											selectedSector?.id === sector.id
												? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
												: sector.ticketsAvailable === 0
													? "border-gray-200 dark:border-gray-800 opacity-50 cursor-not-allowed"
													: "border-gray-200 dark:border-gray-800 hover:border-primary-300"
										}`}
									>
										<p className='font-medium text-gray-900 dark:text-white'>{sector.nameSector}</p>
										<p className='text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1'>
											R$ {Number(sector.fullPrice).toFixed(2)}
										</p>
										<p className='text-xs text-gray-400 mt-1'>
											{sector.ticketsAvailable} disponíveis
										</p>
									</button>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Card de compra */}
				<div className='lg:col-span-1'>
					<div className='sticky top-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4'>
						<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>Comprar ingresso</h2>

						{/* Tipo */}
						<div>
							<label className='block text-sm text-gray-600 dark:text-gray-400 mb-2'>Tipo</label>
							<div className='grid grid-cols-2 gap-2'>
								<button
									onClick={() => setTicketType("full")}
									className={`py-2 rounded-xl text-sm font-medium transition-all ${
										ticketType === "full"
											? "bg-primary-600 text-white"
											: "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
									}`}
								>
									Inteira
								</button>
								<button
									onClick={() => setTicketType("half")}
									className={`py-2 rounded-xl text-sm font-medium transition-all ${
										ticketType === "half"
											? "bg-primary-600 text-white"
											: "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400"
									}`}
								>
									Meia
								</button>
							</div>
						</div>

						{/* Quantidade */}
						<div>
							<label className='block text-sm text-gray-600 dark:text-gray-400 mb-2'>Quantidade</label>
							<div className='flex items-center gap-3'>
								<button
									onClick={() => setQty((q) => Math.max(1, q - 1))}
									className='w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 transition-colors text-lg font-bold'
								>
									-
								</button>
								<span className='text-gray-900 dark:text-white font-semibold text-lg w-8 text-center'>
									{qty}
								</span>
								<button
									onClick={() => setQty((q) => q + 1)}
									className='w-10 h-10 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 transition-colors text-lg font-bold'
								>
									+
								</button>
							</div>
						</div>

						{/* Preço */}
						{price && (
							<div className='pt-2 border-t border-gray-100 dark:border-gray-800'>
								<div className='flex justify-between items-center'>
									<span className='text-sm text-gray-500 dark:text-gray-400'>Total</span>
									<span className='text-xl font-bold text-gray-900 dark:text-white'>
										R$ {(price * qty).toFixed(2)}
									</span>
								</div>
							</div>
						)}

						{/* Botão comprar */}
						<button
							onClick={handleBuy}
							disabled={buying || !selectedSector}
							className='w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{buying ? (
								<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
							) : (
								<>
									<ShoppingCart size={18} />
									{token ? "Comprar" : "Entrar para comprar"}
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default EventDetail;
