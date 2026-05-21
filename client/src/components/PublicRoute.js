import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function PublicRoute({ children }) {
	const { token } = useContext(AuthContext);

	return token ? <Navigate to='/' /> : children;
}

export default PublicRoute;
