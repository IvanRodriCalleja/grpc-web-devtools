import { ReactElement } from 'react';
import { cleanup, render } from '@testing-library/react';

import { afterEach } from 'vitest';

afterEach(() => {
	cleanup();
});

export const testRender = (ui: ReactElement, options = {}) => {
	return render(ui, {
		// wrap provider(s) here if needed
		wrapper: ({ children }) => children,
		...options
	});
};
