import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, LogIn, LogOut, Ticket, LayoutDashboard } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";

function Navbar() {
	const { token, user, logout } = useContext(AuthContext);
	const { theme, toggleTheme } = useContext(ThemeContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<nav className='border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 h-16 flex items-center justify-between'>
				<Link to='/' className='text-2xl font-bold text-primary-600 dark:text-primary-400 tracking-tight'>
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
			</div>
		</nav>
	);
}

export default Navbar;
