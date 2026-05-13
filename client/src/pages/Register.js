import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await api.post("/auth/register", { name, email, password });
			navigate("/login");
		} catch (error) {
			alert("Não foi possível fazer o cadastro");
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<input type='text' placeholder='Nome completo' value={name} onChange={(e) => setName(e.target.value)} />
				<input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<input
					type='password'
					placeholder='Sennha'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Cadastrar</button>
			</form>
		</div>
	);
}

export default Register;
