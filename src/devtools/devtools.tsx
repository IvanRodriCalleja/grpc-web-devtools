import ReactDOM from 'react-dom/client';

import { DevTools } from './app/DevTools';

import './index.css';

chrome.devtools.panels.create('grpc-web', '', 'src/devtools/panel.html', panel => {
	panel.onShown.addListener(window => {
		ReactDOM.createRoot(window.document.getElementById('root')!).render(<DevTools />);

		installStyles(window.document);
	});
});

const installStyles = (targetDocument: Document) => {
	const links = document.querySelectorAll('link[rel="stylesheet"]');
	links.forEach(link => {
		const newLink = link.cloneNode(true);
		targetDocument.head.appendChild(newLink);
	});
};
