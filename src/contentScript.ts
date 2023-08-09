import { injectScript } from './contentScript/injectScript';
import { NetworkMessage } from './shared';

const grpcWebInterceptorsUrl = chrome.runtime.getURL('../injected.js');

window.addEventListener('message', (event: MessageEvent<NetworkMessage>) => {
	if (event.source !== window) {
		return;
	}

	const message = event.data;

	if (message.source === 'grpc-web-devtools' && typeof message.action === 'object') {
		chrome.runtime.sendMessage(message);
	}
});

injectScript(grpcWebInterceptorsUrl);
