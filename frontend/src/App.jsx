import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import ProjectPage from "./pages/ProjectPage/ProjectsPage.jsx";
import SingleProjectPage from "./pages/ProjectPage/SingleProjectPage.jsx";
import TasksPage from "./pages/TasksPage/TasksPage.jsx";
import AdminPanelPage from "./pages/AdminPanelPage/AdminPanelPage.jsx";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Public */}
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				{/* Protected */}
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/projects"
					element={
						<ProtectedRoute>
							<ProjectPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/projects/:project"
					element={
						<ProtectedRoute>
							<SingleProjectPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/tasks"
					element={
						<ProtectedRoute>
							<TasksPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/admin"
					element={
						<ProtectedRoute>
							<AdminPanelPage />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}
