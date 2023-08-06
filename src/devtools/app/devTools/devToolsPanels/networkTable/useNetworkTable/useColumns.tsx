import { useMemo } from 'react';

import { css } from '@panda/css';
import { ColumnDef } from '@tanstack/react-table';

import { GrpcNetworkPartial } from 'src/shared';

import { NetworkStatus } from './useColumns/NetworkStatus';
import { NetworkTime } from './useColumns/NetworkTime';
import { NetworkType } from './useColumns/NetworkType';

export const smallColumn = css({
	width: '20%',
	minWidth: '56px'
});

export const useColumns = () => {
	return useMemo<ColumnDef<GrpcNetworkPartial>[]>(
		() => [
			{
				accessorKey: 'url',
				header: 'Url',
				minSize: 92
			},
			{
				accessorKey: 'Status',
				minSize: 56,
				cell: ({ row }) => <NetworkStatus status={row.original.status} />
			},
			{
				accessorKey: 'Type',
				minSize: 56,
				cell: ({ row }) => <NetworkType type={row.original.type} />,
				meta: {
					className: smallColumn
				}
			},
			{
				accessorKey: 'Time',
				minSize: 56,
				cell: ({ row }) => <NetworkTime time={row.original.time} />,
				meta: {
					className: smallColumn
				}
			}
		],
		[]
	);
};
