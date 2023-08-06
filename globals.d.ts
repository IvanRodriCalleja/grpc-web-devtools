declare global {
	interface Window {
		GRPC_WEB_DEVTOOLS: (services: unknown[]) => void;
	}
}
