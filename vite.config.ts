import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
	return {
		resolve: {
			alias: {
				'@panda': path.resolve(__dirname, './src/devtools/styled-system'),
				test: path.resolve(__dirname, './test')
			}
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: './vitest.setup.ts',
			css: true
		}
	};
});
