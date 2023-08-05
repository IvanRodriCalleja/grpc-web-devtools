import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { useDevToolsNetwork } from '../DevToolsNetworkContext';
import { NetworkTable } from './devToolsPanels/NetworkTable';

export const DevToolsPanels = () => {
	const { selectedNetworkRequest } = useDevToolsNetwork();

	return (
		<PanelGroup autoSaveId="conditional" direction="horizontal">
			<Panel id="left" order={2}>
				<NetworkTable />
			</Panel>
			{selectedNetworkRequest && (
				<>
					<PanelResizeHandle />
					<Panel id="right" order={1}>
						Detail
					</Panel>
				</>
			)}
		</PanelGroup>
	);
};
