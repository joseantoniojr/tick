import { useState, useEffect } from "react";
import { Calendar, MapPin, Tag, CheckCircle, Clock, QrCode, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import api from "../services/api";

function MyTickets() {
	const [tickets, setTickets] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedTicket, setSelectedTicket] = useState(null);

	useEffect(() => {
		api.get("/tickets/my")
			.then((response) => {
				setTickets(response.data);
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
		<div className='max-w-3xl mx-auto'>
			{/* Header */}
			<div className='mb-8'>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Meus Ingressos</h1>
				<p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>
					{tickets.length} ingresso{tickets.length !== 1 ? "s" : ""}
				</p>
			</div>

			{/* Lista vazia */}
			{tickets.length === 0 ? (
				<div className='text-center py-16 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl'>
					<p className='text-4xl mb-4'>🎟️</p>
					<p className='text-gray-500 dark:text-gray-400'>Você ainda não comprou nenhum ingresso</p>
				</div>
			) : (
				<div className='space-y-4'>
					{tickets.map((ticket) => (
						<div
							key={ticket.id}
							className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden'
						>
							<div className='flex'>
								{/* Banner lateral */}
								<div className='w-32 bg-gray-100 dark:bg-gray-800 flex-shrink-0'>
									{ticket.event?.banner ? (
										<img
											src={ticket.event.banner}
											alt={ticket.event.title}
											className='w-full h-full object-cover'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center text-3xl'>
											🎟️
										</div>
									)}
								</div>

								{/* Conteúdo */}
								<div className='flex-1 p-5'>
									<div className='flex items-start justify-between gap-4'>
										<div>
											<h2 className='font-bold text-gray-900 dark:text-white text-lg'>
												{ticket.event?.title}
											</h2>
											<div className='space-y-1 mt-2'>
												<div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
													<Calendar size={14} />
													<span>
														{ticket.session?.scheduledAt
															? new Date(ticket.session.scheduledAt).toLocaleString(
																	"pt-BR",
																)
															: "Data não disponível"}
													</span>
												</div>
												<div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
													<MapPin size={14} />
													<span>{ticket.event?.city} - {ticket.event?.state} — {ticket.event?.venueName}</span>
												</div>
												<div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
													<Tag size={14} />
													<span>{ticket.type === "full" ? "Inteira" : "Meia entrada"}</span>
												</div>
											</div>
										</div>

										{/* Status e preço */}
										<div className='text-right flex-shrink-0'>
											<p className='text-xl font-bold text-gray-900 dark:text-white'>
												R$ {Number(ticket.pricePaid).toFixed(2)}
											</p>
											<span
												className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full mt-2 ${
													ticket.status
														? "bg-gray-100 dark:bg-gray-800 text-gray-500"
														: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
												}`}
											>
												{ticket.status ? (
													<>
														<CheckCircle size={12} /> Usado
													</>
												) : (
													<>
														<Clock size={12} /> Ativo
													</>
												)}
											</span>
										</div>
									</div>
								</div>
							</div>

							{/* Divisor pontilhado */}
							<div className='border-t border-dashed border-gray-200 dark:border-gray-700 mx-4' />

							{/* Footer */}
							<div className='px-5 py-3 flex items-center justify-between'>
								<p className='text-xs text-gray-400 font-mono'>
									#{ticket.id.slice(0, 8).toUpperCase()}
								</p>
								<button
									onClick={() => setSelectedTicket(ticket)}
									className='flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 hover:underline'
								>
									<QrCode size={14} />
									Ver QR Code
								</button>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Modal QR Code */}
			{selectedTicket && (
				<div
					className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'
					onClick={() => setSelectedTicket(null)}
				>
					<div
						className='bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-sm w-full text-center'
						onClick={(e) => e.stopPropagation()}
					>
						{/* Fechar */}
						<div className='flex items-center justify-between mb-6'>
							<h2 className='text-lg font-bold text-gray-900 dark:text-white'>QR Code</h2>
							<button
								onClick={() => setSelectedTicket(null)}
								className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
							>
								<X size={20} className='text-gray-500' />
							</button>
						</div>

						{/* Evento */}
						<p className='text-gray-600 dark:text-gray-400 text-sm mb-6'>{selectedTicket.event?.title}</p>

						{/* QR Code */}
						<div className='flex justify-center mb-6 p-4 bg-white rounded-2xl inline-block mx-auto'>
							<QRCodeSVG value={selectedTicket.id} size={200} level='H' includeMargin={true} />
						</div>

						{/* Info */}
						<div className='space-y-2 text-sm text-gray-500 dark:text-gray-400'>
							<p>
								{selectedTicket.sector?.nameSector} —{" "}
								{selectedTicket.type === "full" ? "Inteira" : "Meia"}
							</p>
							<p className='font-mono text-xs'>#{selectedTicket.id.slice(0, 8).toUpperCase()}</p>
						</div>

						{/* Status */}
						<div
							className={`mt-4 py-2 px-4 rounded-xl text-sm font-medium ${
								selectedTicket.status
									? "bg-gray-100 dark:bg-gray-800 text-gray-500"
									: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
							}`}
						>
							{selectedTicket.status ? "✓ Ingresso utilizado" : "✓ Ingresso válido"}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default MyTickets;
