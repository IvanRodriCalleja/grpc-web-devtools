import { VirtualItem } from '@tanstack/react-virtual';

type VirtualizationTopSpacingProps = {
	virtualRows: VirtualItem[];
};

export const VirtualizationTopSpacing = ({ virtualRows }: VirtualizationTopSpacingProps) => {
	const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;

	return paddingTop > 0 ? (
		<tr>
			<td style={{ height: `${paddingTop}px` }} />
		</tr>
	) : null;
};
