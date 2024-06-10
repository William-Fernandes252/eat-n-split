import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FriendsContextProvider } from "./contexts/friends.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<FriendsContextProvider>
			<App />
		</FriendsContextProvider>
	</React.StrictMode>,
);
