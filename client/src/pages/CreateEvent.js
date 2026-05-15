import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateEvent() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [indicativeRating, setIndicativeRating] = useState("");
	const [category, setCategory] = useState("");
	const [banner, setBanner] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/events", { title, description, indicativeRating, category, banner });
			navigate("/dashboard");
		} catch (error) {
			alert("Error ao criar um evento");
		}
	};

	return (
		<div>
			<h1>Criar um evento</h1>
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
				<button type='submit'>Criar Evento</button>
			</form>
		</div>
	);
}

export default CreateEvent;
