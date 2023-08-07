import { useRef } from 'react';

import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import { useDevToolsNetwork } from '../../../DevToolsNetworkContext';
import { useColumns } from './useNetworkTable/useColumns';

export const useNetworkTable = () => {
	const columns = useColumns();

	const {
		state: { networkRequests }
	} = useDevToolsNetwork();
	const tableRender = useReactTable({
		data: networkRequests,
		columns,
		getCoreRowModel: getCoreRowModel()
	});

	const tableContainerRef = useRef<HTMLDivElement>(null);

	const { rows } = tableRender.getRowModel();

	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		overscan: 10,
		estimateSize: () => 28,
		getScrollElement: () => tableContainerRef.current
	});

	const virtualRows = rowVirtualizer.getVirtualItems();
	const totalSize = rowVirtualizer.getTotalSize();

	return { virtualRows, totalSize, tableRender, tableContainerRef, rows };
};
