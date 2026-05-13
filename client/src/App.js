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
import PrivateRoute from "./components/PrivateRoute";

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/events/:id' element={<EventDetail />} />
					<Route
						path='/dashboard'
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path='/events/create'
						element={
							<PrivateRoute>
								<CreateEvent />
							</PrivateRoute>
						}
					/>
					<Route
						path='/events/:id/edit'
						element={
							<PrivateRoute>
								<EditEvent />
							</PrivateRoute>
						}
					/>
					<Route
						path='/tickets'
						element={
							<PrivateRoute>
								<MyTickets />
							</PrivateRoute>
						}
					/>
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
