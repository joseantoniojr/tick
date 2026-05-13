import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/auth/login", { email, password });
			login(response.data.token);
			navigate("/dashboard");
		} catch (error) {
			alert("Email ou senha incorretos");
		}
	};

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
				<input
					type='password'
					placeholder='Senha'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type='submit'>Entrar</button>
			</form>
		</div>
	);
}

export default Login;
