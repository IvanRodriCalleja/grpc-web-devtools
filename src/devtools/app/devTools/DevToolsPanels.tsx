import { Panel, PanelGroup } from 'react-resizable-panels';

import { useDevToolsNetwork } from '../DevToolsNetworkContext';
import { NetworkDetail } from './devToolsPanels/NetworkDetail';
import { NetworkTable } from './devToolsPanels/NetworkTable';
import { ResizeHandle } from './devToolsPanels/ResizeHandler';

export const DevToolsPanels = () => {
	const {
		state: { selectedNetworkRequest }
	} = useDevToolsNetwork();

	return (
		<PanelGroup autoSaveId="conditional" direction="horizontal">
			<Panel id="left" order={1}>
				<NetworkTable />
			</Panel>
			{selectedNetworkRequest && (
				<>
					<ResizeHandle />
					<Panel id="right" order={2}>
						<NetworkDetail networkRequest={selectedNetworkRequest} />
					</Panel>
				</>
			)}
		</PanelGroup>
	);
};
