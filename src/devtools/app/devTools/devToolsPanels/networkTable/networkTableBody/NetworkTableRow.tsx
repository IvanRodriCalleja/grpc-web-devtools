import { cx } from '@panda/css';
import { Cell, flexRender } from '@tanstack/react-table';

import { GrpcNetworkPartial } from 'src/shared';

import { cell as cellClassName, ellipsis } from '../shared/tableStyles';

type NetworkTableRowProps = {
	cell: Cell<GrpcNetworkPartial, unknown>;
};

export const NetworkTableRow = ({ cell }: NetworkTableRowProps) => (
	<td className={cx(cellClassName, ellipsis)} key={cell.id}>
		{flexRender(cell.column.columnDef.cell, cell.getContext())}
	</td>
);
