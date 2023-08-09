import { css } from '@panda/css';

import { useDevToolsNetwork } from '../../DevToolsNetworkContext';
import { NetworkTableBody } from './networkTable/NetworkTableBody';
import { NetworkTableHead } from './networkTable/NetworkTableHead';
import { useNetworkTable } from './networkTable/useNetworkTable';

const tableContainer = css({ height: '100%', width: '100%', overflow: 'auto' });
const table = css({
	tableLayout: 'fixed',
	borderCollapse: 'separate',
	borderSpacing: 0,
	width: '100%',
	borderBottom: '1px solid var(--network-border)'
});

export const NetworkTable = () => {
	const { virtualRows, totalSize, tableContainerRef, tableRender, rows } = useNetworkTable();
	const {
		onSelectNetwork,
		state: { selectedNetworkRequest }
	} = useDevToolsNetwork();

	return (
		<div ref={tableContainerRef} className={tableContainer}>
			<table className={table}>
				<NetworkTableHead tableRender={tableRender} />
				<NetworkTableBody
					rows={rows}
					totalSize={totalSize}
					virtualRows={virtualRows}
					selectedNetworkRequest={selectedNetworkRequest}
					onSelectNetwork={onSelectNetwork}
				/>
			</table>
		</div>
	);
};
