import { createContext, useState } from "react";

const AuthContext = createContext();

const decodeToken = (token) => {
	try {
		const base64 = token.split(".")[1];
		const decoded = decodeURIComponent(
			atob(base64)
				.split("")
				.map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
				.join("")
		);
		return JSON.parse(decoded);
	} catch (error) {
		return null;
	}
};

function AuthProvider({ children }) {
	const [token, setToken] = useState(localStorage.getItem("token") || null);
	const [user, setUser] = useState(() => {
		const saved = localStorage.getItem("token");
		return saved ? decodeToken(saved) : null;
	});

	const login = (token) => {
		setToken(token);
		setUser(decodeToken(token));
		localStorage.setItem("token", token);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
	};

	return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
}

export { AuthContext };
export default AuthProvider;
