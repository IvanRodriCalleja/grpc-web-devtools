import { VirtualItem } from '@tanstack/react-virtual';

type VirtualizationBottomSpacingProps = {
	virtualRows: VirtualItem[];
	totalSize: number;
};

export const VirtualizationBottomSpacing = ({
	virtualRows,
	totalSize
}: VirtualizationBottomSpacingProps) => {
	const paddingBottom =
		virtualRows.length > 0 ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0) : 0;

	return paddingBottom > 0 ? (
		<tr>
			<td style={{ height: `${paddingBottom}px` }} />
		</tr>
	) : null;
};
