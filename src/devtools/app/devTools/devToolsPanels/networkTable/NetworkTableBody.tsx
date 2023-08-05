import { css, cx } from '@panda/css';
import { Row } from '@tanstack/react-table';
import { VirtualItem } from '@tanstack/react-virtual';
import { StatusCode } from 'grpc-web';

import { GrpcNetworkPartial } from '../../../DevToolsNetworkContext';
import { NetworkTableRow } from './networkTableBody/NetworkTableRow';
import { VirtualizationBottomSpacing } from './networkTableBody/VirtualizationBottomSpacing';
import { VirtualizationTopSpacing } from './networkTableBody/VirtualizationTopSpacing';

const tr = css({
	cursor: 'pointer',
	_hover: {
		backgroundColor: 'var(--network-row-hover) !important'
	}
});

const trOdd = css({
	backgroundColor: 'var(--network-row-odd)'
});

const networkFailed = css({
	color: 'var(--enabled-color)'
});

type NetworkTableBodyProps = {
	virtualRows: VirtualItem[];
	rows: Row<GrpcNetworkPartial>[];
	totalSize: number;
};

export const NetworkTableBody = ({ virtualRows, rows, totalSize }: NetworkTableBodyProps) => (
	<tbody>
		<VirtualizationTopSpacing virtualRows={virtualRows} />

		{virtualRows.map(virtualRow => {
			const row = rows[virtualRow.index];

			const { status } = row.original;
			const hasFailed = status !== StatusCode.OK && status !== undefined;

			return (
				<tr
					className={cx(tr, virtualRow.index % 2 === 0 && trOdd, hasFailed && networkFailed)}
					key={row.id}>
					{row.getVisibleCells().map(cell => (
						<NetworkTableRow key={row.id} cell={cell} />
					))}
				</tr>
			);
		})}
		<VirtualizationBottomSpacing totalSize={totalSize} virtualRows={virtualRows} />
	</tbody>
);
