const connections: { [key: number]: chrome.runtime.Port } = {};

chrome.runtime.onConnect.addListener(port => {
	const extensionListener = (message: { name: string; tabId: number }) => {
		if (message.name == 'init') {
			connections[message.tabId] = port;
			return;
		}
	};

	port.onMessage.addListener(extensionListener);

	port.onDisconnect.addListener(port => {
		port.onMessage.removeListener(extensionListener);

		const tabs = Object.keys(connections) as unknown as number[];
		for (let i = 0, len = tabs.length; i < len; i++) {
			if (connections[tabs[i]] == port) {
				delete connections[tabs[i]];
				break;
			}
		}
	});
});

chrome.runtime.onMessage.addListener((request, sender) => {
	if (sender.tab) {
		const tabId = sender.tab.id as number;
		if (tabId in connections) {
			connections[tabId].postMessage(request);
		} else {
			console.log('Tab not found in connection list.');
		}
	} else {
		console.log('sender.tab not defined.');
	}
	return true;
});
