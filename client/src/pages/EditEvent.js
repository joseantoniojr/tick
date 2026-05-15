import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditEvent() {
	const { id } = useParams();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [indicativeRating, setIndicativeRating] = useState("");
	const [category, setCategory] = useState("");
	const [banner, setBanner] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		api.get(`/events/${id}`)
			.then((response) => {
				const event = response.data;
				setTitle(event.title);
				setDescription(event.description);
				setIndicativeRating(event.indicativeRating);
				setCategory(event.category);
				setBanner(event.banner);
			})
			.catch((error) => console.log(error));
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.put(`/events/${id}`, { title, description, indicativeRating, category, banner });
			navigate("/dashboard");
		} catch (error) {
			alert("Error ao editar o evento");
		}
	};

	return (
		<div>
			<h1>Editar evento ({title})</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Nome do Evento'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Descrição do Evento'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Classificação Indicativa'
					value={indicativeRating}
					onChange={(e) => setIndicativeRating(e.target.value)}
				/>
				<input
					type='text'
					placeholder='Categoria'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
				<input
					type='text'
					placeholder='URL do banner (ex: https://...)'
					value={banner}
					onChange={(e) => setBanner(e.target.value)}
				/>
				<button type='submit'>Editar Evento</button>
			</form>
		</div>
	);
}

export default EditEvent;
