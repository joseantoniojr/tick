import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import MyTickets from "./pages/MyTickets";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/events/:id' element={<EventDetail />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/events/create' element={<CreateEvent />} />
					<Route path='/events/:id/edit' element={<EditEvent />} />
					<Route path='/tickets' element={<MyTickets />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
