import { defineConfig } from "cypress";

export default defineConfig({
	projectId: "djx8xc",

	component: {
		devServer: {
			framework: "react",
			bundler: "vite",
		},
	},

	e2e: {
		baseUrl: process.env.BASE_URL || "http://localhost:5173",
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
	},
});
