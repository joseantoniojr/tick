import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { Mail, Lock, User, UserPlus } from "lucide-react";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			await api.post("/auth/register", { name, email, password });
			navigate("/login");
		} catch (error) {
			setError("Não foi possível criar sua conta. Tente outro email.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-[80vh] flex items-center justify-center'>
			<div className='w-full max-w-md'>
				<div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8'>
					{/* Header */}
					<div className='text-center mb-8'>
						<h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-2'>Criar conta</h1>
						<p className='text-gray-500 dark:text-gray-400 text-sm'>
							Junte-se ao{" "}
							<span className='text-primary-600 dark:text-primary-400 font-semibold'>tick.</span>
						</p>
					</div>

					{/* Erro */}
					{error && (
						<div className='mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'>
							<p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
						</div>
					)}

					{/* Form */}
					<form onSubmit={handleSubmit} className='space-y-4'>
						{/* Nome */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Nome completo
							</label>
							<div className='relative'>
								<User size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
								<input
									type='text'
									placeholder='Seu nome'
									value={name}
									onChange={(e) => setName(e.target.value)}
									className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
								/>
							</div>
						</div>

						{/* Email */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Email
							</label>
							<div className='relative'>
								<Mail size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
								<input
									type='email'
									placeholder='seu@email.com'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
								/>
							</div>
						</div>

						{/* Senha */}
						<div>
							<label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>
								Senha
							</label>
							<div className='relative'>
								<Lock size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
								<input
									type='password'
									placeholder='••••••••'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className='w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all'
								/>
							</div>
						</div>

						{/* Botão */}
						<button
							type='submit'
							disabled={loading}
							className='w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2'
						>
							{loading ? (
								<div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
							) : (
								<>
									<UserPlus size={18} />
									Criar conta
								</>
							)}
						</button>
					</form>

					{/* Footer */}
					<p className='text-center text-sm text-gray-500 dark:text-gray-400 mt-6'>
						Já tem conta?{" "}
						<Link
							to='/login'
							className='text-primary-600 dark:text-primary-400 font-medium hover:underline'
						>
							Entrar
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Register;
