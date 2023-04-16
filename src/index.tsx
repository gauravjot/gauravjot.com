import React from "react";
import ReactDOM from "react-dom";
import {
	Route,
	Navigate,
	Routes,
	BrowserRouter as Router,
	redirect,
} from "react-router-dom";
import { themeApply } from "./components/utils/theme_switch/ThemeApply";

import "./assets/css/main.css";
import "./assets/css/spinner.css";
import "./assets/css/icons.css";
import { Spinner } from "./components/utils/Spinner";
import { NotFound } from "./components/utils/NotFound";

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
									<div className="grid items-center h-screen justify-center text-gray-300 bg-gray-950">
										<Spinner />
									</div>
								}
							>
								<Home />
							</React.Suspense>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
}
