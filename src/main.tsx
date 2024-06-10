import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { FriendsContextProvider } from "./contexts/friends.tsx";
import { ThemeProvider } from "./providers/theme.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="system">
			<FriendsContextProvider>
				<App />
			</FriendsContextProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
