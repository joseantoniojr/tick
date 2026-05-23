import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogIn, LogOut, Ticket, LayoutDashboard, Menu, X } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

function Navbar() {
	const { token, user, logout } = useContext(AuthContext);
	const { theme, toggleTheme } = useContext(ThemeContext);
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		setMenuOpen(false);
		navigate("/");
	};

	return (
		<nav className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
				<Link
					to='/'
					onClick={() => setMenuOpen(false)}
					className='text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-tight'
				>
					tick.
				</Link>

				<div className='hidden md:flex items-center gap-6'>
					<Link
						to='/'
						className='text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
					>
						Eventos
					</Link>
					{token && (
						<Link
							to='/dashboard'
							className='text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1'
						>
							<LayoutDashboard size={16} />
							Dashboard
						</Link>
					)}
					{token && (
						<Link
							to='/tickets'
							className='text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1'
						>
							<Ticket size={16} />
							Meus Ingressos
						</Link>
					)}
				</div>

				<div className='flex items-center gap-3'>
					{token && user && (
						<span className='text-sm text-gray-600 dark:text-gray-400 hidden md:block'>
							Olá, <span className='font-medium text-gray-900 dark:text-white'>{user.name}</span>
						</span>
					)}

					<button
						onClick={toggleTheme}
						className='p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
					>
						{theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
					</button>

					<div className='hidden md:block'>
						{token ? (
							<button
								onClick={handleLogout}
								className='p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
							>
								<LogOut size={20} />
							</button>
						) : (
							<Link
								to='/login'
								className='p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
							>
								<LogIn size={20} />
							</Link>
						)}
					</div>
					{/* Hamburguer — mobile */}
					<button
						onClick={() => setMenuOpen(!menuOpen)}
						className='md:hidden p-2 rounded-full text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
					>
						{menuOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>
			</div>
			{/* Menu mobile */}
			{menuOpen && (
				<div className='md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-1'>
					{/* Nome */}
					{token && user && (
						<p className='text-sm text-gray-500 dark:text-gray-400 px-3 pb-3 border-b border-gray-100 dark:border-gray-800 mb-2'>
							Olá, <span className='font-medium text-gray-900 dark:text-white'>{user.name}</span>
						</p>
					)}

					<Link
						to='/'
						onClick={() => setMenuOpen(false)}
						className='flex items-center gap-2 px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
					>
						Eventos
					</Link>

					{token && (
						<Link
							to='/dashboard'
							onClick={() => setMenuOpen(false)}
							className='flex items-center gap-2 px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
						>
							<LayoutDashboard size={18} />
							Dashboard
						</Link>
					)}

					{token && (
						<Link
							to='/tickets'
							onClick={() => setMenuOpen(false)}
							className='flex items-center gap-2 px-3 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors'
						>
							<Ticket size={18} />
							Meus Ingressos
						</Link>
					)}

					{/* Login/Logout mobile */}
					<div className='pt-2 border-t border-gray-100 dark:border-gray-800 mt-2'>
						{token ? (
							<button
								onClick={handleLogout}
								className='flex items-center gap-2 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors w-full'
							>
								<LogOut size={18} />
								Sair
							</button>
						) : (
							<Link
								to='/login'
								onClick={() => setMenuOpen(false)}
								className='flex items-center gap-2 px-3 py-3 rounded-xl text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors'
							>
								<LogIn size={18} />
								Entrar
							</Link>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}

export default Navbar;
