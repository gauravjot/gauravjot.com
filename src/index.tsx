import React from "react";
import ReactDOM from "react-dom";
import { Route, Navigate, Routes, BrowserRouter as Router } from "react-router-dom";
import { themeApply } from "./utils/theme_switch/ThemeApply";

import "./assets/css/main.css";
import "./assets/css/spinner.css";
import { Spinner } from "./utils/Spinner";

const Home = React.lazy(() => import("./components/home/Home"));

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

themeApply();

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route
						path="/"
						element={
							<React.Suspense
								fallback={
									<div className="grid items-center justify-center py-24 text-gray-300 bg-gray-950">
										<Spinner />
									</div>
								}
							>
								<Home />
							</React.Suspense>
						}
					/>
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</div>
		</Router>
	);
}
