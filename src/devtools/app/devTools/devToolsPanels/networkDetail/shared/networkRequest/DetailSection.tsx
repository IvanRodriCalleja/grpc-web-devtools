import { PropsWithChildren } from 'react';

import { css } from '@panda/css';

const section = css({
	padding: '8px',
	flex: 1,
	overflow: 'auto'
});

export const DetailSection = ({ children }: PropsWithChildren) => (
	<section className={section}>{children}</section>
);
