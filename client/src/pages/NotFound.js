import { Link } from "react-router-dom";

function NotFound() {
	return (
		<div className='min-h-[70vh] flex flex-col items-center justify-center text-center'>
			<p className='text-8xl font-bold text-primary-600 dark:text-primary-400 mb-4'>404</p>
			<h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>Página não encontrada</h1>
			<p className='text-gray-500 dark:text-gray-400 mb-8'>
				A página que você procura não existe ou foi removida.
			</p>
			<Link
				to='/'
				className='px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors'
			>
				Voltar para Home
			</Link>
		</div>
	);
}

export default NotFound;
