import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventDetail from "./pages/EventDetail";
import Dashboard from "./pages/Dashboard";
import ManageEvent from "./pages/ManageEvent";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import MyTickets from "./pages/MyTickets";
import PrivateRoute from "./components/PrivateRoute";
import ThemeProvider from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import PublicRoute from "./components/PublicRoute";
import NotFound from "./pages/NotFound";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<AuthProvider>
					<Layout>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route
								path='/login'
								element={
									<PublicRoute>
										<Login />
									</PublicRoute>
								}
							/>
							<Route
								path='/register'
								element={
									<PublicRoute>
										<Register />
									</PublicRoute>
								}
							/>
							<Route path='/events/:id' element={<EventDetail />} />
							<Route
								path='/dashboard'
								element={
									<PrivateRoute>
										<Dashboard />
									</PrivateRoute>
								}
							/>
							<Route path="/events/:id/manage" element={
								<PrivateRoute>
									<ManageEvent />
								</PrivateRoute>
							} />
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
							<Route path='*' element={<NotFound />} />
						</Routes>
					</Layout>
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
