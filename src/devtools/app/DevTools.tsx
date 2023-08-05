import { css } from '@panda/css';

import { DevToolsNetworkProvider } from './DevToolsNetworkContext';
import { DevToolsPanels } from './devTools/DevToolsPanels';

const devtoolsContainer = css({
	height: '100vh',
	display: 'flex'
});

export const DevTools = () => (
	<div className={devtoolsContainer}>
		<DevToolsNetworkProvider>
			<DevToolsPanels />
		</DevToolsNetworkProvider>
	</div>
);
