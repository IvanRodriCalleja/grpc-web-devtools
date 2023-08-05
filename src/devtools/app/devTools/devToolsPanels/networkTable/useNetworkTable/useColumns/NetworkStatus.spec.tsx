import { screen } from '@testing-library/react';
import { StatusCode } from 'grpc-web';
import { testRender } from 'test/utils';
import { describe, expect, it } from 'vitest';

import { NetworkStatus } from './NetworkStatus';

describe('NetworkTable', () => {
	it('should render status when exists', () => {
		testRender(<NetworkStatus status={StatusCode.ALREADY_EXISTS} />);

		const status = screen.getByText('ALREADY_EXISTS');
		expect(status).toBeInTheDocument();
	});

	it('should render pending when status is undefined', () => {
		testRender(<NetworkStatus status={undefined} />);

		const status = screen.getByText('(Pending)');
		expect(status).toBeInTheDocument();
	});
});
