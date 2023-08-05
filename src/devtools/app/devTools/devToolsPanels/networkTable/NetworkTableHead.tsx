import { css, cx } from '@panda/css';
import { Table, flexRender } from '@tanstack/react-table';

import { GrpcNetworkPartial } from '../../../DevToolsNetworkContext';
import { cell, ellipsis } from './shared/table.css';

const thead = css({
	margin: 0,
	position: 'sticky',
	top: 0
});

const th = css({
	textAlign: 'left',
	backgroundColor: 'var(--toolbar-bg-color)',
	color: 'var(--toolbar-color)',
	fontWeight: '700',
	verticalAlign: 'middle',
	lineHeight: '18px',
	height: '18px',
	padding: '2px 4px',
	borderBottom: '1px solid var(--network-border)'
});

type NetworkTableHeadProps = {
	tableRender: Table<GrpcNetworkPartial>;
};

export const NetworkTableHead = ({ tableRender }: NetworkTableHeadProps) => (
	<thead className={thead}>
		{tableRender.getHeaderGroups().map(headerGroup => (
			<tr key={headerGroup.id}>
				{headerGroup.headers.map(header => (
					<th
						//@ts-ignore
						className={cx(th, cell, ellipsis, header.column.columnDef.meta?.className)}
						key={header.id}
						colSpan={header.colSpan}>
						{header.isPlaceholder ? null : (
							<div className={ellipsis}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</div>
						)}
					</th>
				))}
			</tr>
		))}
	</thead>
);
