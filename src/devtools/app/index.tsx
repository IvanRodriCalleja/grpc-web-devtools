import ReactDOM from 'react-dom/client';

import { DevTools } from './DevTools';
import { DevToolsNetworkProvider } from './DevToolsNetworkContext';
import './index.css';

ReactDOM.createRoot(window.document.getElementById('root')!).render(
	<DevToolsNetworkProvider>
		<DevTools />
	</DevToolsNetworkProvider>
);
