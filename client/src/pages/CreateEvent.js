import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Image, Tag, Shield, AlignLeft, Type } from "lucide-react";
import api from "../services/api";

function CreateEvent() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [indicativeRating, setIndicativeRating] = useState("");
	const [category, setCategory] = useState("");
	const [banner, setBanner] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await api.post("/events", { title, description, indicativeRating, category, banner });
			navigate("/dashboard");
		} catch (error) {
			setError("Erro ao criar evento. Verifique os campos.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='max-w-2xl mx-auto'>
			{/* Header */}
			<div className='flex items-center gap-4 mb-8'>
				<Link
					to='/dashboard'
					className='p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-600 transition-all'
				>
					<ArrowLeft size={20} />
				</Link>
				<div>
					<h1 className='text-3xl font-bold text-gray-900 dark:text-white'>Criar evento</h1>
					<p className='text-gray-500 dark:text-gray-400 text-sm mt-1'>
						Preencha as informações do seu evento
					</p>
				</div>
			</div>

			{/* Card */}
			<div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8'>
				{/* Erro */}
				{error && (
					<div className='mb-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
						<p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
					</div>
				)}

				{/* Preview do banner */}
				{banner && banner.startsWith("http") && (
					<div className='mb-6 aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800'>
						<img
							src={banner}
							alt='Preview'
							className='w-full h-full object-cover'
							onError={(e) => (e.target.style.display = "none")}
						/>
					</div>
				)}

				<form onSubmit={handleSubmit} className='space-y-5'>
					{/* Título */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Título
						</label>
						<div className='relative'>
							<Type size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
							<input
								type='text'
								placeholder='Nome do evento'
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
							/>
						</div>
					</div>

					{/* Descrição */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							Descrição
						</label>
						<div className='relative'>
							<AlignLeft size={18} className='absolute left-3 top-3 text-gray-400' />
							<textarea
								placeholder='Descreva seu evento'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								rows={4}
								className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none'
							/>
						</div>
					</div>

					{/* Categoria e Classificação */}
					<div className='grid grid-cols-2 gap-4'>
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Categoria
							</label>
							<div className='relative'>
								<Tag size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
								<select
									value={category}
									onChange={(e) => setCategory(e.target.value)}
									className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none'
								>
									<option value=''>Selecione</option>
									<option value='Música'>Música</option>
									<option value='Teatro'>Teatro</option>
									<option value='Festival'>Festival</option>
									<option value='Esporte'>Esporte</option>
									<option value='Stand-up'>Stand-up</option>
									<option value='Outro'>Outro</option>
								</select>
							</div>
						</div>

						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Classificação
							</label>
							<div className='relative'>
								<Shield size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
								<select
									value={indicativeRating}
									onChange={(e) => setIndicativeRating(e.target.value)}
									className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all appearance-none'
								>
									<option value=''>Selecione</option>
									<option value='Livre'>Livre</option>
									<option value='10'>10+</option>
									<option value='12'>12+</option>
									<option value='14'>14+</option>
									<option value='16'>16+</option>
									<option value='18'>18+</option>
								</select>
							</div>
						</div>
					</div>

					{/* Banner */}
					<div>
						<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
							URL do Banner
						</label>
						<div className='relative'>
							<Image size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
							<input
								type='text'
								placeholder='https://exemplo.com/imagem.jpg'
								value={banner}
								onChange={(e) => setBanner(e.target.value)}
								className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
							/>
						</div>
					</div>

					{/* Botões */}
					<div className='flex gap-3 pt-2'>
						<Link
							to='/dashboard'
							className='flex-1 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-medium text-center hover:border-gray-300 transition-colors'
						>
							Cancelar
						</Link>
						<button
							type='submit'
							disabled={loading}
							className='flex-1 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
						>
							{loading ? (
								<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
							) : (
								"Criar evento"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateEvent;
