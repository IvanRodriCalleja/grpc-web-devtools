import { css } from '@panda/css';

import { DevToolsNetworkProvider } from './DevToolsNetworkContext';
import { DevToolsPanels } from './devTools/DevToolsPanels';
import { Toolbar } from './devTools/Toolbar';

const devtoolsContainer = css({
	height: '100vh',
	display: 'flex',
	flexDirection: 'column'
});

const main = css({
	flex: 1,
	overflow: 'auto'
});

export const DevTools = () => (
	<div className={devtoolsContainer}>
		<DevToolsNetworkProvider>
			<Toolbar />
			<main className={main}>
				<DevToolsPanels />
			</main>
		</DevToolsNetworkProvider>
	</div>
);
