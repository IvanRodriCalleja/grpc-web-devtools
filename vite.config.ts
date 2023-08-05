import { crx } from '@crxjs/vite-plugin';
import swc from '@vitejs/plugin-react-swc';

import path from 'path';
import autoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

import manifest from './src/manifest.json';

export default defineConfig(() => {
	return {
		plugins: [
			//@ts-ignore
			crx({ manifest }),
			swc(),
			autoImport({
				imports: [
					{
						'webextension-polyfill': [['*', 'browser']]
					}
				],
				dts: path.resolve(__dirname, 'src/auto-imports.d.ts')
			})
		],
		build: {
			sourcemap: true,
			outDir: `./${process.env.BROWSER}/build`,
			rollupOptions: {
				input: {
					devtool: path.resolve(__dirname, 'src/devtools/panel.html')
				}
			}
		},
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
