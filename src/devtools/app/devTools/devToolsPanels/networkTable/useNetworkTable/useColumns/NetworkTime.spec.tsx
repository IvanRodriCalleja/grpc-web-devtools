import { screen } from '@testing-library/react';
import { testRender } from 'test/utils';
import { describe, expect, it } from 'vitest';

import { NetworkTime } from './NetworkTime';

describe('NetworkTime', () => {
	it('should render time ms', () => {
		testRender(<NetworkTime time={100} />);

		const time = screen.getByText('100ms');
		expect(time).toBeInTheDocument();
	});

	it('should render pending when time is undefined', () => {
		testRender(<NetworkTime time={undefined} />);

		const time = screen.getByText('(Pending)');
		expect(time).toBeInTheDocument();
	});
});
